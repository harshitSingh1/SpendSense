import rateLimit from 'express-rate-limit';
import { requireUser } from '../../lib/auth-utils';
import { Request, Response, NextFunction } from 'express';

// 1. Authenticate and attach user context
export const authenticateChatUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await requireUser(req);
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

// 2. Dynamic Rate Limiter
export const chatRateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  limit: (req: Request | any) => {
    const user = (req as any).user;
    // Return 100 if pro, otherwise 3
    return user?.plan === 'pro' ? 100 : 3;
  },
  keyGenerator: (req: Request | any) => {
    const user = (req as any).user;
    // Key by user ID to follow the account, fallback to raw IP
    return user ? user.id : (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown');
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      error: 'limit_reached',
      message: 'You have used your 3 daily AI prompts. Upgrade to SpendSense Pro for unlimited access.'
    });
  }
});
