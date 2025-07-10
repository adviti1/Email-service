📧 Resilient Email Sending Service (TypeScript)
A production-ready, fault-tolerant email service built with TypeScript, designed to handle failure gracefully and ensure message delivery with resilience and intelligence.

✅ Perfect for systems that demand reliability, deduplication, and provider fallback.

✨ What Makes This Special?
🔁 Retries – Automatically retries failed sends (with exponential backoff)
🔄 Fallback – Switches to backup provider on failure
⚡ Circuit Breaker – Avoids flaky providers for a cooling period
🛡️ Idempotency – Prevents duplicate emails with unique keys
🚦 Rate Limiting – 5 emails/minute per recipient
📝 Logging – Insightful logs for every action
📊 Status Tracking – Know which provider was used and how many attempts it took
🧪 Mock Providers – Simulate real-world provider behavior for safe testing

🧠 Project Architecture
bash
Copy
Edit
📁 src/
│
├── services/
│   ├── EmailService.ts         # Core logic & flow
│   └── providers/
│       ├── MockProviderA.ts    # Random failure mock
│       └── MockProviderB.ts    # Always succeed mock
│
├── utils/
│   ├── RateLimiter.ts          # Rate limiting logic
│   ├── IdempotencyStore.ts     # Deduplication logic
│   ├── Logger.ts               # Custom console logger
│   └── CircuitBreaker.ts       # Skip broken providers
│
├── types.ts                    # Common interfaces
│
📁 tests/
└── EmailService.test.ts        # Jest test suite
🚀 Quickstart
🔧 Clone the repo
bash
Copy
Edit
git clone https://github.com/YOUR_USERNAME/email-service.git
cd email-service
📦 Install dependencies
bash
Copy
Edit
npm install
✅ Run Tests
bash
Copy
Edit
npx jest
🟢 You should see:

vbnet
Copy
Edit
✓ sends email successfully
✓ blocks duplicate idempotency key
✓ respects rate limiting
📬 How to Use It
Use the EmailService class like this:

ts
Copy
Edit
{
  to: "user@example.com",
  subject: "Hello from Adviti's Service 🚀",
  body: "This is a real-time test email.",
  idempotencyKey: "unique-key-001"
}
🧪 Mock Providers Explained
Provider	Behavior
MockProviderA	Randomly fails (tests retry/fallback)
MockProviderB	Always succeeds

These simulate real-world conditions and are ideal for testing circuit breakers, retries, and failovers.

🌍 Live Demo
Send a POST request to:

🔗 https://email-service-l30l.onrender.com/send-email

Example POST (use Postman or cURL):
json
Copy
Edit
{
  "to": "test@example.com",
  "subject": "Hello from the Cloud",
  "body": "This email was sent from a resilient TypeScript service!",
  "idempotencyKey": "email-adviti-123"
}
🎥 Screencast
🎬 Coming Soon: [Add your Loom/YouTube link here]

💡 Inspired by Real-World Problems
This service reflects battle-tested patterns used by big companies like Stripe, Amazon, and Twilio to guarantee message delivery in unreliable conditions.

👩‍💻 Author
Made with 💙 by Adviti Gangwat

