import { Resend } from "resend";
import config from "@/config";

// Provide fallback for testing if RESEND_API_KEY is not set
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
let resend;

try {
  if (!RESEND_API_KEY) {
    console.warn(
      "Warning: RESEND_API_KEY is not set. Email functionality will be limited."
    );
  }
  resend = new Resend(RESEND_API_KEY);
} catch (error) {
  console.error("Failed to initialize Resend:", error);
}

// Ensure we have fallback values for fromAdmin
const fromEmail = config?.resend?.fromAdmin || "noreply@example.com";

/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {Object} params - The parameters for sending the email.
 * @param {string | string[]} params.to - The recipient's email address or an array of email addresses.
 * @param {string} params.subject - The subject of the email.
 * @param {string} params.text - The plain text content of the email.
 * @param {string} params.html - The HTML content of the email.
 * @param {string} [params.replyTo] - The email address to set as the "Reply-To" address.
 * @returns {Promise<Object>} A Promise that resolves with the email sending result data.
 */
export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
  // Return mock data if Resend is not initialized
  if (!resend || !RESEND_API_KEY) {
    console.warn("Resend not initialized. Email would have been sent with:", {
      to,
      subject,
    });
    return { id: "mock-email-id-" + Date.now(), mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      text,
      html,
      ...(replyTo && { replyTo }),
    });

    if (error) {
      console.error("Error sending email:", error.message);
      throw error;
    }

    return data;
  } catch (e) {
    console.error("Failed to send email:", e);
    // Don't throw the error so it doesn't break the application flow
    // Instead return a mock success to allow the application to continue
    return {
      id: "error-mock-email-id-" + Date.now(),
      error: e.message,
      mock: true,
    };
  }
};
