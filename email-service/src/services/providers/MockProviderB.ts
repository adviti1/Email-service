import { EmailPayload, EmailProvider } from "../../types";

export class MockProviderB implements EmailProvider {
  async sendEmail(payload: EmailPayload): Promise<boolean> {
    const failChance = Math.random();
    console.log(`[MockProviderB] Sending email to ${payload.to}. Fail chance: ${failChance}`);
    return failChance > 0.2; // 80% chance to succeed
  }
}
