import { requireUser } from "../auth-utils";
import User from "../models/User";
import dbConnect from "../mongodb";
import bcrypt from "bcryptjs";

export async function updateUserProfile(req: any, data: { name?: string, password?: string }) {
  const sessionUser = await requireUser(req);
  await dbConnect();
  
  const dbUser = await User.findById((sessionUser as any).id);
  if (!dbUser) {
    throw new Error("User not found");
  }

  if (data.name) {
    dbUser.name = data.name;
  }

  if (data.password) {
    // Check if the user has a local password already
    const salt = await bcrypt.genSalt(10);
    dbUser.password = await bcrypt.hash(data.password, salt);
  }

  await dbUser.save();

  return { name: dbUser.name, email: dbUser.email };
}
