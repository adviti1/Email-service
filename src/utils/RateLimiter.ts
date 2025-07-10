export class RateLimiter {
  private limit: number;
  private interval: number;
  private timestamps: Map<string, number[]>;

  constructor(limit: number, interval: number) {
    this.limit = limit;
    this.interval = interval;
    this.timestamps = new Map();
  }

  allow(identifier: string): boolean {
    const now = Date.now();
    const timestamps = this.timestamps.get(identifier) || [];

    // Remove expired timestamps
    const filtered = timestamps.filter((ts) => now - ts < this.interval);
    if (filtered.length >= this.limit) return false;

    filtered.push(now);
    this.timestamps.set(identifier, filtered);
    return true;
  }
}
