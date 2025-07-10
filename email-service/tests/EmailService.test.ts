import { EmailService } from "../src/services/EmailService";

const validPayload = {
  to: "test@example.com",
  subject: "Hello",
  body: "This is a test",
  idempotencyKey: "email-123",
};

describe("EmailService", () => {
  let service: EmailService;

  beforeEach(() => {
    service = new EmailService();
  });

  test("sends email successfully", async () => {
    const result = await service.sendEmail(validPayload);
    expect(result.success).toBe(true);
    expect(result.attempts).toBeGreaterThan(0);
    expect(result.providerUsed).toBeDefined();
  });

  test("blocks duplicate idempotency key", async () => {
    await service.sendEmail(validPayload);
    const result = await service.sendEmail(validPayload);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Duplicate request");
  });

  test("respects rate limiting", async () => {
    for (let i = 0; i < 5; i++) {
      await service.sendEmail({ ...validPayload, idempotencyKey: `key-${i}` });
    }
    const result = await service.sendEmail({ ...validPayload, idempotencyKey: "key-over" });
    expect(result.success).toBe(false);
    expect(result.message).toBe("Rate limit exceeded");
  });
});
