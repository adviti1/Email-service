# 📧 Resilient Email Sending Service (TypeScript)

A **production-ready**, **fault-tolerant** email service built with TypeScript, designed to handle failures gracefully and ensure message delivery with intelligence.

> ✅ Perfect for systems that demand **reliability**, **deduplication**, and **provider fallback**.

---

## ✨ Key Features

- 🔁 **Retry with Exponential Backoff**
- 🔄 **Provider Fallback**
- ⚡ **Circuit Breaker**
- 🛡️ **Idempotency Support**
- 🚦 **Rate Limiting**
- 📊 **Status Tracking**
- 📝 **Logging**
- 🧪 **Mock Providers for Testing**

---

## 🧠 Project Structure

📁 src/
│
├── services/
│ ├── EmailService.ts # Core logic
│ └── providers/
│ ├── MockProviderA.ts # Randomly fails
│ └── MockProviderB.ts # Always succeeds
│
├── utils/
│ ├── RateLimiter.ts
│ ├── IdempotencyStore.ts
│ ├── Logger.ts
│ └── CircuitBreaker.ts
│
├── types.ts # Common types
│
📁 tests/
└── EmailService.test.ts # Unit tests

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/adviti1/Email-service.git
cd email-service
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Run the Tests
bash
Copy
Edit
npx jest
✅ Expected Output:

vbnet
Copy
Edit
✓ sends email successfully
✓ blocks duplicate idempotency key
✓ respects rate limiting
📬 How to Use
You can use the EmailService class by passing the following payload:

ts
Copy
Edit
{
  to: "test@example.com",
  subject: "Hello from Adviti's Service 🚀",
  body: "This is a resilient test email.",
  idempotencyKey: "unique-key-001"
}
🧪 Mock Providers
Provider	Behavior
MockProviderA	Randomly fails (to test retry/fallback)
MockProviderB	Always succeeds (backup provider)

These simulate real-world scenarios to test reliability features.

🌐 Live API
🚀 https://email-service-l30l.onrender.com/send-email

📨 Example POST Request (use Postman or curl):

json
Copy
Edit
{
  "to": "test@example.com",
  "subject": "Live API Test",
  "body": "Hello from the deployed API!",
  "idempotencyKey": "email-adviti-123"
}
📹 Screencast
🎥 Coming Soon – Add your screencast video link here.

👩‍💻 Author
Made with 💙 by Adviti Gangwat