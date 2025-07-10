# 📧 Resilient Email Sending Service (TypeScript)

A fault-tolerant, testable email service with:

- ✅ Retry logic (exponential backoff)
- ✅ Provider fallback (failover)
- ✅ Circuit breaker pattern
- ✅ Idempotency support
- ✅ Rate limiting
- ✅ Logging
- ✅ Status tracking
- ✅ Mock providers for testing

---

## 📦 Features

| Feature             | Description |
|---------------------|-------------|
| **Retry**           | Retries failed sends up to 3 times with exponential backoff |
| **Fallback**        | Switches to another provider if the current one fails |
| **Circuit Breaker** | Skips flaky providers after repeated failures |
| **Idempotency**     | Prevents duplicate sends via idempotency key |
| **Rate Limiting**   | Allows up to 5 emails/minute per recipient |
| **Status Tracking** | Tracks success, failure, attempts, and provider used |
| **Mock Providers**  | Simulates success/failure of real-world providers |
| **Logging**         | Lightweight console logger for debug/info/error |

---

## 🧠 Architecture

📁 src/
├── services/
│ ├── EmailService.ts
│ └── providers/
│ ├── MockProviderA.ts
│ └── MockProviderB.ts
├── utils/
│ ├── RateLimiter.ts
│ ├── IdempotencyStore.ts
│ ├── Logger.ts
│ └── CircuitBreaker.ts
├── types.ts
📁 tests/
└── EmailService.test.ts