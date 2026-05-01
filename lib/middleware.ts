import { Request, Response, NextFunction } from "express";
import { getSession } from "@auth/express";
import { authConfig } from "./auth";

/**
 * Express middleware to protect internal routes.
 * Redirects unauthenticated users to home page.
 */
export async function protectRoutes(req: Request, res: Response, next: NextFunction) {
  const session = await getSession(req, authConfig as any);
  
  const protectedPaths = ["/dashboard", "/tracker", "/goals", "/invest", "/shield", "/settings", "/profile"];
  const isProtected = protectedPaths.some((path) => req.path.startsWith(path));

  if (isProtected && !session) {
    return res.redirect("/");
  }

  next();
}
