import { EmailPayload, EmailProvider } from "../types";
import { MockProviderA } from "./providers/MockProviderA";
import { MockProviderB } from "./providers/MockProviderB";
import { RateLimiter } from "../utils/RateLimiter";
import { IdempotencyStore } from "../utils/IdempotencyStore";
import { Logger } from "../utils/Logger";
import { CircuitBreaker } from "../utils/CircuitBreaker";

export class EmailService {
  private providers: EmailProvider[];
  private rateLimiter: RateLimiter;
  private idempotencyStore: IdempotencyStore;
  private logger: Logger;
  private circuitBreakers: Map<string, CircuitBreaker>;

  constructor() {
    this.providers = [new MockProviderA(), new MockProviderB()];
    this.rateLimiter = new RateLimiter(5, 60 * 1000);
    this.idempotencyStore = new IdempotencyStore();
    this.logger = new Logger();
    this.circuitBreakers = new Map();

    for (const provider of this.providers) {
      const key = provider.constructor.name;
      this.circuitBreakers.set(key, new CircuitBreaker(3, 30000));
    }
  }

  public async sendEmail(payload: EmailPayload): Promise<any> {
    const { idempotencyKey, to } = payload;

    //  Idempotency Check
    if (this.idempotencyStore.has(idempotencyKey)) {
      this.logger.log("Duplicate request blocked (idempotency key): " + idempotencyKey);
      return {
        success: false,
        message: "Duplicate request",
        providerUsed: null,
        attempts: 0,
      };
    }

    //  Rate Limiting
    if (!this.rateLimiter.allow(to)) {
      this.logger.log(`Rate limit exceeded for: ${to}`);
      return {
        success: false,
        message: "Rate limit exceeded",
        providerUsed: null,
        attempts: 0,
      };
    }

    // Try each provider with retry and circuit breaker
    for (const provider of this.providers) {
      const providerKey = provider.constructor.name;
      const breaker = this.circuitBreakers.get(providerKey);

      if (breaker && !breaker.canAttempt()) {
        this.logger.warn(`Circuit breaker open for ${providerKey}, skipping...`);
        continue;
      }

      let attempt = 0;
      let delay = 500;

      while (attempt < 3) {
        try {
          attempt++;
          const result = await provider.sendEmail(payload);
          if (result) {
            breaker?.recordSuccess();
            this.idempotencyStore.set(idempotencyKey);
            this.logger.log(`Email sent to ${to} using ${providerKey} in attempt ${attempt}`);
            return {
              success: true,
              message: "Email sent successfully",
              providerUsed: providerKey,
              attempts: attempt,
            };
          } else {
            throw new Error("Provider returned failure");
          }
        } catch (err) {
          breaker?.recordFailure();
          this.logger.error(`Attempt ${attempt} failed with ${providerKey}: ${err}`);
          if (attempt < 3) {
            await this.sleep(delay);
            delay *= 2;
          }
        }
      }

      this.logger.warn(`Provider ${providerKey} failed. Trying next...`);
    }

    //  All providers failed
    this.logger.error(`All providers failed to send email to ${to}`);
    return {
      success: false,
      message: "All providers failed",
      providerUsed: null,
      attempts: 3,
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
