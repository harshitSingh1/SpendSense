import mongoose from "mongoose";

const VerificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '15m' } // TTL index
  }
});

export default mongoose.models.VerificationToken || mongoose.model("VerificationToken", VerificationTokenSchema);
