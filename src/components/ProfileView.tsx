import React from "react";
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  LogOut, 
  ArrowRight,
  UserCircle
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProfileViewProps {
  user: any;
  onSignOut: () => void;
}

export default function ProfileView({ user, onSignOut }: ProfileViewProps) {
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
            <Button variant="outline" className="rounded-xl font-bold border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-slate-300">Edit Profile</Button>
          </div>
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
