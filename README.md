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

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/email-service.git
cd email-service

2. Install dependencies
bash
Copy
Edit
npm install
3. Run the tests
bash
Copy
Edit
npx jest
Expected output:

vbnet
Copy
Edit
PASS  tests/EmailService.test.ts
✓ sends email successfully
✓ blocks duplicate idempotency key
✓ respects rate limiting
✨ Usage
The EmailService class can be used inside any TypeScript project. It accepts an EmailPayload with:

ts
Copy
Edit
{
  to: string;
  subject: string;
  body: string;
  idempotencyKey: string;
}
🛠 Mock Providers
Two fake providers simulate real-world conditions:

MockProviderA: Fails randomly

MockProviderB: Always succeeds

These are designed to test the fallback, retry, and circuit breaker logic.

📦 Future Enhancements
✅ Express.js API wrapper (POST /send-email)

⏳ Job queue support (e.g. BullMQ, Redis)

⏳ Integration with real email providers (SendGrid, Mailgun)

📡 Deployment (Optional)
You can deploy the service via:

✅ Railway

✅ Render

Wrap EmailService.sendEmail() inside an Express route and deploy.

📽 Screencast Checklist
✅ Show your face
✅ Brief project intro
✅ Show passing tests
✅ Show retry + fallback working
✅ Show logs for circuit breaker & idempotency
✅ Show GitHub repo + deployed API

🔗 Links
GitHub Repo: Add Your Link Here

Screencast: Add Video Link Here

Live API: optional

👤 Author
Built with 💙 by [Your Name]

yaml
Copy
Edit

---

### ✅ How to Make It Appear on GitHub

1. Create the file in the **root folder** of your project:
email-service/
├── README.md ✅
├── src/
└── package.json

sql
Copy
Edit

2. Add and commit it:
```bash
git add README.md
git commit -m "Add proper GitHub-friendly README"
git push origin main