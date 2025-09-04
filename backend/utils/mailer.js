import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();


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
        <p><strong>Crypto Minning</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Crypto Minning" <${process.env.EMAIL_USER}>`,
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

export const sendWelcomeEmail = async (to, name, email, password, referralCode) => {
    const subject = 'Welcome to Crypto Mining!';
    const html = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
      <h2 style="color: #007BFF;">Welcome to CRYPTO MINNING, ${name}!</h2>
      <p>Hello ${name},</p>
      <p>Your account has been created successfully.</p>
      <p>We Welcome you to CRYPTO MINNING where we are all going to work together in building the complete Eco-System of CRYPTO-MINNING and earn huge benefits from cashbacks and beautifully designed working incomes </p>
      <p>For your reference, Here are your login details:</p>

      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please keep your password secure and do not share it with anyone.</p>
      <br>
      <p>Best regards,</p>
      <p><strong>Crypto Mining Team</strong></p>
    </div>
  `;
    const text = `Welcome to Crypto Mining, ${name}!

Your account has been created successfully.

Here are your login details:
User ID: ${referralCode}
Email: ${email}
Password: ${password}

Please keep your password secure and do not share it with anyone.

Best regards,
Crypto Mining Team`;

    try {
        await transporter.sendMail({
            from: `"Crypto Minning" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
            text,
        });
        console.log("✅ Welcome mail sent successfully");
    } catch (error) {
        console.error("❌ Error sending welcome mail:", error);
        throw new Error(`Failed to send welcome email: ${error.message}`);
    }
};