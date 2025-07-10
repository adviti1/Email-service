export class CircuitBreaker {
  private failureCount = 0;
  private readonly failureThreshold: number;
  private readonly cooldownTime: number;
  private lastFailureTime: number | null = null;
  private state: "CLOSED" | "OPEN" = "CLOSED";

  constructor(failureThreshold = 3, cooldownTime = 30000) {
    this.failureThreshold = failureThreshold;
    this.cooldownTime = cooldownTime; // 30 seconds
  }

  public canAttempt(): boolean {
    if (this.state === "OPEN") {
      const now = Date.now();
      if (this.lastFailureTime && now - this.lastFailureTime > this.cooldownTime) {
        // Cooldown period passed, reset
        this.state = "CLOSED";
        this.failureCount = 0;
        return true;
      }
      return false;
    }
    return true;
  }

  public recordFailure(): void {
    this.failureCount++;
    if (this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
      this.lastFailureTime = Date.now();
    }
  }

  public recordSuccess(): void {
    this.failureCount = 0;
    this.state = "CLOSED";
  }

  public getState(): string {
    return this.state;
  }
}
