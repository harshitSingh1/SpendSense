import crypto from "crypto";
import bcrypt from "bcryptjs";
import dbConnect from "../mongodb";
import User from "../models/User";
import PasswordResetToken from "../models/PasswordResetToken";
import { transporter } from "../mail";

export async function sendPasswordResetEmail(email: string) {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    // Return success to prevent email enumeration
    return { success: true };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  await PasswordResetToken.deleteMany({ email });

  await PasswordResetToken.create({
    email,
    token,
    expiresAt,
  });

  const resetLink = `https://${process.env.NEXT_PUBLIC_APP_URL || "spendsense.ai"}/auth/new-password?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset your SpendSense AI Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4f46e5;">Password Reset Request</h2>
        <p>You requested a password reset. Please click the link below to securely reset your password:</p>
        <p>
          <a href="${resetLink}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, you can safely ignore this email. Your account is secure.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}

export async function resetPassword(token: string, newPassword: string) {
  await dbConnect();

  const resetTokenRecord = await PasswordResetToken.findOne({ token });

  if (!resetTokenRecord) {
    throw new Error("Invalid or expired password reset token");
  }

  if (new Date() > new Date(resetTokenRecord.expiresAt)) {
    await PasswordResetToken.deleteOne({ _id: resetTokenRecord._id });
    throw new Error("Password reset token has expired");
  }

  const user = await User.findOne({ email: resetTokenRecord.email });
  
  if (!user) {
    throw new Error("User no longer exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  // CRITICAL: Delete the token from the database so it cannot be used twice
  await PasswordResetToken.deleteMany({ email: user.email });

  return { success: true };
}
