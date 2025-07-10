import { EmailPayload, EmailProvider } from "../types";
import { MockProviderA } from "./providers/MockProviderA";
import { MockProviderB } from "./providers/MockProviderB";
import { RateLimiter } from "../utils/RateLimiter";
import { IdempotencyStore } from "../utils/IdempotencyStore";
import { Logger } from "../utils/Logger";

export class EmailService {
  private providers: EmailProvider[];
  private rateLimiter: RateLimiter;
  private idempotencyStore: IdempotencyStore;
  private logger: Logger;

  constructor() {
    this.providers = [new MockProviderA(), new MockProviderB()];
    this.rateLimiter = new RateLimiter(5, 60 * 1000); // 5 emails/minute
    this.idempotencyStore = new IdempotencyStore();
    this.logger = new Logger();
  }

  public async sendEmail(payload: EmailPayload): Promise<any> {
    const { idempotencyKey, to } = payload;

    // ✅ 1. Idempotency Check
    if (this.idempotencyStore.has(idempotencyKey)) {
      this.logger.log("Duplicate request blocked (idempotency key): " + idempotencyKey);
      return {
        success: false,
        message: "Duplicate request",
        providerUsed: null,
        attempts: 0,
      };
    }

    // ✅ 2. Rate Limiting
    if (!this.rateLimiter.allow(to)) {
      this.logger.log(`Rate limit exceeded for: ${to}`);
      return {
        success: false,
        message: "Rate limit exceeded",
        providerUsed: null,
        attempts: 0,
      };
    }

    // ✅ 3. Try Each Provider with Retry
    for (const provider of this.providers) {
      let attempt = 0;
      let delay = 500; // 0.5 seconds initial

      while (attempt < 3) {
        try {
          attempt++;
          const result = await provider.sendEmail(payload);
          if (result) {
            this.idempotencyStore.set(idempotencyKey);
            this.logger.log(`Email sent to ${to} using ${provider.constructor.name} in attempt ${attempt}`);
            return {
              success: true,
              message: "Email sent successfully",
              providerUsed: provider.constructor.name,
              attempts: attempt,
            };
          } else {
            throw new Error("Provider returned failure");
          }
        } catch (err) {
          this.logger.error(`Attempt ${attempt} failed with ${provider.constructor.name}: ${err}`);
          if (attempt < 3) {
            await this.sleep(delay);
            delay *= 2; // Exponential backoff
          }
        }
      }
      // After 3 attempts, try next provider (fallback)
      this.logger.warn(`Provider ${provider.constructor.name} failed. Trying next...`);
    }

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
