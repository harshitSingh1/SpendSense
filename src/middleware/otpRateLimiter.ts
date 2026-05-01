import rateLimit from 'express-rate-limit';

export const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // 10 requests maximum per IP
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many verification attempts from this network. Try again in 15 minutes.'
    });
  }
});
