import { EmailProvider, EmailPayload } from "../types";

export class MockProviderA implements EmailProvider {
  async sendEmail(payload: EmailPayload): Promise<boolean> {
    console.log(`[ProviderA] Sending email to ${payload.to}`);
    return Math.random() > 0.3; // Simulate failure
  }
}
