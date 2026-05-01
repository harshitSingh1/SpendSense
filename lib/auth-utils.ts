import { Request } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "./auth";

/**
 * Reusable server-side utility to ensure a user is authenticated.
 * Used in API routes or logic layers.
 */
export async function requireUser(req: Request) {
  const session = await getSession(req, authConfig as any);
  
  if (!session || !session.user) {
    throw new Error("Unauthorized: Access denied. Please sign in to continue.");
  }

  return session.user;
}
