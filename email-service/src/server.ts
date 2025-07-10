import express from "express";
import bodyParser from "body-parser";
import { EmailService } from "./services/EmailService";

const app = express();
app.use(bodyParser.json());

const emailService = new EmailService();

app.post("/send-email", async (req, res) => {
  const payload = req.body;

  if (!payload.to || !payload.subject || !payload.body || !payload.idempotencyKey) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  const status = await emailService.sendEmail(payload);
  res.status(status.success ? 200 : 500).json(status);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Email API running at http://localhost:${PORT}`);
});
