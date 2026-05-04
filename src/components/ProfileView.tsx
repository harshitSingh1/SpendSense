import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  LogOut, 
  ArrowRight,
  UserCircle,
  Loader2,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

interface ProfileViewProps {
  user: any;
  onSignOut: () => void;
}

export default function ProfileView({ user, onSignOut }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, password: password || undefined })
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setPassword("");
      // Need to slightly delay or re-fetch to reflect changes, but we'll trust the session refresh mechanism
      window.location.reload(); 
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8 pb-20"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Account Intelligence</h2>
        <p className="text-sm text-muted-foreground font-medium">Manage your SpendSense identity and global preferences.</p>
      </div>

      {/* Main Profile Card */}
      <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden bg-white dark:bg-zinc-900">
        <div className="h-40 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-indigo-500/10 relative">
          <div className="absolute -bottom-12 left-8 p-1 rounded-full bg-white dark:bg-zinc-900 ring-8 ring-white dark:ring-zinc-900">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 flex items-center justify-center">
              {user.image ? (
                <img src={user.image} alt={user.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserCircle className="h-16 w-16 text-slate-300 dark:text-slate-600" />
              )}
            </div>
          </div>
        </div>
        <CardContent className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{user.name || "User"}</h3>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="rounded-xl font-bold border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-slate-100 dark:border-zinc-800 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Display Name</label>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Your name" 
                      className="max-w-md h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">New Password (Optional)</label>
                    <Input 
                      type="password"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="Leave blank to keep current" 
                      className="max-w-md h-12"
                    />
                  </div>
                  <div className="pt-2">
                    <Button 
                      onClick={handleSaveProfile}
                      disabled={isSaving || !name.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 px-8 font-bold"
                    >
                      {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Subscription Overview */}
      <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900 overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-zinc-800/50 pb-6 border-b border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800 dark:text-white">Subscription Overview</CardTitle>
              <CardDescription className="text-slate-500 font-medium">Manage your billing and plan details.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {!user?.isPro ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Current Plan</p>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-slate-800 dark:text-white">Free Tier</p>
                  <span className="flex h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                </div>
              </div>
              <Button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('navigate', { detail: 'pro' }));
                }}
                className="rounded-xl px-6 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Upgrade to Pro
              </Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Current Plan</p>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-slate-800 dark:text-white">
                      SpendSense Pro ({user.plan || "Active"})
                    </p>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest ml-1">Active</span>
                  </div>
                  {user.proExpiresAt && (
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                      Valid until: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(user.proExpiresAt))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preferences & Security */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800 dark:text-white">Preferences</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Customized intelligence delivery.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <PreferenceToggle 
              label="Email Notifications" 
              description="Receive critical alerts via email."
              defaultChecked 
            />
            <PreferenceToggle 
              label="Weekly Intelligence Report" 
              description="Auto-generated health summary."
              defaultChecked 
            />
            <PreferenceToggle 
              label="Real-time Guard" 
              description="Push notifications for large spends."
            />
          </CardContent>
        </Card>

        <Card className="border border-slate-100 dark:border-zinc-800 shadow-sm rounded-3xl bg-white dark:bg-zinc-900">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg text-slate-800 dark:text-white">Security</CardTitle>
                <CardDescription className="text-slate-500 font-medium">Protect your financial data.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
              <div className="space-y-0.5">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Authentication</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Google Connected</p>
              </div>
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
              <div className="space-y-0.5">
                <p className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Data Encryption</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">AES-256 Enabled</p>
              </div>
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <div className="pt-4">
        <Button 
          onClick={onSignOut}
          variant="ghost" 
          className="w-full justify-center gap-3 rounded-2xl h-14 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold border border-red-500/10"
        >
          <LogOut className="h-5 w-5" />
          Sign Out of SpendSense
        </Button>
      </div>
    </motion.div>
  );
}

function PreferenceToggle({ label, description, defaultChecked }: { label: string, description: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked || false);

  return (
    <div 
      className="flex items-center justify-between group cursor-pointer"
      onClick={() => setChecked(!checked)}
    >
      <div className="space-y-0.5">
        <p className="text-sm font-bold group-hover:text-primary transition-colors">{label}</p>
        <p className="text-[11px] text-muted-foreground font-medium">{description}</p>
      </div>
      <div className={`
        relative h-6 w-11 rounded-full transition-colors duration-200 ease-in-out
        ${checked ? 'bg-primary' : 'bg-muted'}
      `}>
        <div className={`
          absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `} />
      </div>
    </div>
  );
}
