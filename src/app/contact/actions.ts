"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    const data = await resend.emails.send({
      from: 'Morning Rituals Soap', // Later, use your own domain
      to: ['contact@morningritualsoap.com'], // WHERE YOU WANT TO RECEIVE THE LEAD
      subject: `New Vendor Inquiry: ${company || name}`,
      replyTo: email,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No message provided.'}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false };
  }
}