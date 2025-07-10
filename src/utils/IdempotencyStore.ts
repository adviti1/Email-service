export class IdempotencyStore {
  private store: Set<string> = new Set();

  has(key: string): boolean {
    return this.store.has(key);
  }

  set(key: string): void {
    this.store.add(key);
  }
}
