import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  onboardingCompleted: boolean;
  proExpiresAt?: Date;
  isPro?: boolean;
  plan?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    onboardingCompleted: { type: Boolean, default: false },
    proExpiresAt: { type: Date },
    isPro: { type: Boolean, default: false },
    plan: { type: String, default: 'free' },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
