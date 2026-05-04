import Notification from "../models/Notification";
import User from "../models/User";
import mongoose from "mongoose";
import dbConnect from "../mongodb";

/**
 * Creates a new notification for a specific user.
 */
export async function createNotification(
  userId: string | mongoose.Types.ObjectId, 
  title: string, 
  message: string, 
  type: 'system' | 'gamification' | 'billing' | 'global' = 'system'
) {
  try {
    await dbConnect();
    
    // Normalize userId to string to prevent casting issues in some scenarios
    const targetUserId = userId.toString();

    const notification = await Notification.create({
      userId: targetUserId,
      title,
      message,
      type
    });
    
    // Auto-Pruning logic: Keep only the 7 most recent
    const oldNotifications = await Notification.find({ userId: targetUserId })
      .sort({ createdAt: -1 })
      .skip(7)
      .select('_id');

    if (oldNotifications.length > 0) {
      await Notification.deleteMany({ _id: { $in: oldNotifications.map(n => n._id) } });
      console.log('🧹 Pruned ' + oldNotifications.length + ' old notifications.');
    }
    
    console.log('✅ HOOK FIRED: ', title, ' for user ', targetUserId);
    return notification;
  } catch (error) {
    console.error("❌ HOOK FAILED:", error);
    return null;
  }
}

/**
 * Creates a global notification for all users.
 * Performs a bulk insert for efficiency.
 */
export async function broadcastNotification(
  title: string, 
  message: string, 
  type: 'system' | 'gamification' | 'billing' | 'global' = 'global'
) {
  try {
    await dbConnect();
    
    // Fetch all user IDs in the system
    const allUsers = await User.find({}, '_id');
    
    if (allUsers.length === 0) {
      return { success: true, count: 0 };
    }

    // Prepare notification objects for each user
    const notifications = allUsers.map(u => ({
      userId: u._id,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date()
    }));

    // Bulk insert
    await Notification.insertMany(notifications);
    
    return { success: true, count: allUsers.length };
  } catch (error) {
    console.error("Failed to broadcast notifications:", error);
    return { success: false, error: (error as Error).message };
  }
}
