import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, 
  Sparkles, 
  BookOpen, 
  Terminal, 
  CheckCheck,
  Clock,
  CircleDollarSign,
  Trophy,
  Megaphone,
  ShieldCheck,
  Bot
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  isRead: boolean;
  type: 'system' | 'gamification' | 'billing' | 'global' | 'update' | 'tip';
}

interface NotificationInboxProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadCountChange?: (count: number) => void;
}

export default function NotificationInbox({ isOpen, onClose, onUnreadCountChange }: NotificationInboxProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'system': return <Bot className="h-4 w-4" />;
      case 'gamification': return <Trophy className="h-4 w-4" />;
      case 'billing': return <CircleDollarSign className="h-4 w-4" />;
      case 'global': return <Megaphone className="h-4 w-4" />;
      case 'update': return <Terminal className="h-4 w-4" />;
      case 'tip': return <BookOpen className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const fetchNotifications = async () => {
    try {
      // Don't fetch if tab is hidden or whatever, but for now just add robustness
      const res = await fetch("/api/notifications", {
        credentials: "include" // Explicitly ensure cookies are sent
      });
      
      if (res.ok) {
        const data = await res.json();
        const mapped = data.map((n: any) => ({
          id: n._id,
          title: n.title,
          description: n.message,
          time: n.createdAt ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }) : 'just now',
          icon: getIconForType(n.type),
          isRead: n.isRead,
          type: n.type
        }));
        setNotifications(mapped);
        
        const unreadCount = mapped.filter((n: any) => !n.isRead).length;
        onUnreadCountChange?.(unreadCount);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.warn("Notification fetch not ok:", res.status, errorData);
      }
    } catch (e: any) {
      console.error("Failed to fetch notifications:", e.name, e.message);
      // Only log broadly if it's not a common "Failed to fetch" which can happen on refresh
      if (e.name !== 'TypeError') {
        console.error("Detailed notification error:", e);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    
    const handleRefresh = () => fetchNotifications();
    window.addEventListener('refresh-notifications', handleRefresh);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('refresh-notifications', handleRefresh);
    };
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      onUnreadCountChange?.(0);
      
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true })
      });
    } catch (e) {
      console.error("Failed to mark notifications as read:", e);
    }
  };

  // Also mark as read when single notification is clicked? 
  // For now just maintain the "Mark all" functionality as requested.

  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 z-[70] overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl shadow-black/20"
        >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Notifications</h3>
              </div>
              <button 
                onClick={handleMarkAllAsRead}
                className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <CheckCheck className="h-3 w-3" />
                Mark all as read
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-slate-500 mt-2">All caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-50 dark:divide-zinc-800">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 transition-all hover:bg-slate-50 dark:hover:bg-zinc-800/50 ${notif.isRead ? 'opacity-60' : 'bg-blue-50/20 dark:bg-blue-500/5'}`}
                    >
                      <div className="flex gap-4">
                        <div className={`p-2 rounded-xl h-fit ${
                          notif.type === 'system' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600' :
                          notif.type === 'update' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600' :
                          notif.type === 'gamification' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600' :
                          notif.type === 'billing' ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600' :
                          notif.type === 'global' ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600' :
                          'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600'
                        }`}>
                          {notif.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                            {notif.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                            {notif.description}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400 font-medium">
                            <Clock className="h-3 w-3" />
                            {notif.time}
                          </div>
                        </div>
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 text-center">
              <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors uppercase tracking-widest">
                View History
              </button>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
