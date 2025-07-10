import express from "express";
import { EmailService } from "./services/EmailService";
import { EmailPayload } from "./types";

const app = express();
const emailService = new EmailService();

app.use(express.json());

app.post("/send-email", async (req, res) => {
  const payload: EmailPayload = req.body;

  if (!payload.to || !payload.subject || !payload.body || !payload.idempotencyKey) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const result = await emailService.sendEmail(payload);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 Email Service API running at http://localhost:${PORT}`);
});
