import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

// transporter for Gmail (use App Password if Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail", // or "hotmail", "yahoo", etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password (not real password)
  },
});

// send mail function
export const sendMail = async (to, subject, text) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #007BFF;">Your One-Time Password (OTP)</h2>
        <p>Hello,</p>
        <p>Your OTP for account verification is:</p>
        <p style="font-size: 24px; font-weight: bold; color: #28a745;">${text}</p>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>The MyApp Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"MyApp" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: `Your OTP is: ${text}`,
      html,
    });
    console.log("✅ Mail sent successfully");
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
