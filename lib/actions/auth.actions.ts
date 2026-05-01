import crypto from "crypto";
import dbConnect from "../mongodb";
import VerificationToken from "../models/VerificationToken";
import { sendOTPEmail } from "../mail";

export const generateAndSendOTP = async (email: string) => {
  await dbConnect();
  
  // Generate a 6-digit random number
  const otp = crypto.randomInt(100000, 999999).toString();
  
  // Set expiration to 15 minutes from now
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  // Upsert the token
  await VerificationToken.findOneAndUpdate(
    { email },
    { otp, expiresAt, attempts: 0 },
    { upsert: true, new: true }
  );

  // Send the email
  await sendOTPEmail(email, otp);
  
  return { success: true };
};

export const verifyOTP = async (email: string, enteredOtp: string) => {
  await dbConnect();

  const tokenRecord = await VerificationToken.findOne({ email });

  if (!tokenRecord) {
    throw new Error("No verification code found or it has expired.");
  }

  if (tokenRecord.expiresAt < new Date()) {
    // Delete the expired token
    await VerificationToken.deleteOne({ email });
    throw new Error("Verification code has expired.");
  }

  if (tokenRecord.attempts >= 5) {
    await VerificationToken.deleteOne({ email });
    throw new Error("Maximum attempts reached. This OTP has been destroyed. Please request a new one.");
  }

  if (tokenRecord.otp !== enteredOtp) {
    tokenRecord.attempts += 1;
    await tokenRecord.save();
    
    if (tokenRecord.attempts >= 5) {
      await VerificationToken.deleteOne({ email });
      throw new Error("Maximum attempts reached. This OTP has been destroyed. Please request a new one.");
    }
    
    const remaining = 5 - tokenRecord.attempts;
    throw new Error(`Invalid OTP. You have ${remaining} tries remaining.`);
  }

  // Token is valid and not expired, delete it
  await VerificationToken.deleteOne({ email });

  return { success: true };
};
