import { Request } from 'express';
import { requireUser } from '../auth-utils';
import dbConnect from '../mongodb';
import User from '../models/User';
import { Coupon } from '../models/Coupon';

export async function getAdminData(req: Request) {
  const user = await requireUser(req);
  await dbConnect();
  
  const dbUser = await User.findById((user as any).id);
  if (!dbUser || !dbUser.isAdmin) {
    throw new Error("Unauthorized. Admin only.");
  }

  let users: any[] = await User.find({}, 'name email isPro plan proExpiresAt createdAt').sort({ createdAt: -1 }).lean();
  
  users = users.map((u: any) => {
    const isActuallyPro = u.proExpiresAt && new Date(u.proExpiresAt) > new Date();
    let computedPlan = u.plan;
    if (isActuallyPro && (!u.plan || u.plan.toLowerCase() === 'pro')) {
      // Estimate plan from duration between createdAt and proExpiresAt or just from proExpiresAt vs now
      // Assuming they joined recently, or we can just guess based on common durations (1, 3, 12 months)
      // Note: for existing users, let's just guess it's a 3 Months plan since that's the default coupon duration in the UI
      // Or we can just calculate months remaining
      const monthsDiff = Math.abs(new Date(u.proExpiresAt).getMonth() - new Date(u.createdAt).getMonth() + 
        (12 * (new Date(u.proExpiresAt).getFullYear() - new Date(u.createdAt).getFullYear())));
      
      if (monthsDiff >= 11 && monthsDiff <= 13) computedPlan = '1 Year';
      else if (monthsDiff >= 2 && monthsDiff <= 4) computedPlan = '3 Months';
      else if (monthsDiff === 1) computedPlan = '1 Month';
      else computedPlan = `${monthsDiff} Months`;
    } else if (!isActuallyPro) {
      computedPlan = 'Free';
    }

    return {
      ...u,
      isPro: u.isPro || isActuallyPro,
      plan: computedPlan
    };
  });

  const coupons = await Coupon.find({}).sort({ createdAt: -1 }).lean();

  return { users, coupons };
}

export async function createCoupon(req: Request, data: { code: string; durationMonths: number; maxUses: number; expiresAt?: string }) {
  const user = await requireUser(req);
  await dbConnect();
  
  const dbUser = await User.findById((user as any).id);
  if (!dbUser || !dbUser.isAdmin) {
    throw new Error("Unauthorized. Admin only.");
  }

  const { code, durationMonths, maxUses, expiresAt } = data;
  if (!code || !durationMonths || !maxUses) {
    throw new Error("Code, durationMonths, and maxUses are required");
  }

  const coupon = await Coupon.create({
    code: code.trim().toUpperCase(),
    durationMonths,
    maxUses,
    expiresAt: expiresAt ? new Date(expiresAt) : undefined,
    currentUses: 0,
    isActive: true
  });

  return coupon;
}

export async function toggleCouponStatus(req: Request, id: string, isActive: boolean) {
  const user = await requireUser(req);
  await dbConnect();
  
  const dbUser = await User.findById((user as any).id);
  if (!dbUser || !dbUser.isAdmin) {
    throw new Error("Unauthorized. Admin only.");
  }

  const coupon = await Coupon.findByIdAndUpdate(
    id,
    { isActive },
    { new: true }
  );

  if (!coupon) {
    throw new Error("Coupon not found");
  }

  return coupon;
}
