'use client';
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Ticket, 
  Plus, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  Megaphone,
  Send,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminPanel({ user, onBack }: { user: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'users' | 'coupons' | 'broadcast'>('coupons');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ users: any[], coupons: any[] }>({ users: [], coupons: [] });

  // Coupon form
  const [code, setCode] = useState('');
  const [durationMonths, setDurationMonths] = useState('3');
  const [maxUses, setMaxUses] = useState('100');
  const [expiresAt, setExpiresAt] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Broadcast form
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState<'system' | 'gamification' | 'billing' | 'global'>('global');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data", { credentials: "include" });
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          window.dispatchEvent(new CustomEvent('navigate-view', { detail: 'not-found' }));
          return;
        }
        throw new Error("Failed to fetch");
      }
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load admin data");
      onBack(); // Kick out
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          code,
          durationMonths: parseInt(durationMonths),
          maxUses: parseInt(maxUses),
          expiresAt: expiresAt || undefined
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create coupon");
      }

      toast.success("Coupon created successfully");
      setCode('');
      fetchAdminData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleCoupon = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (!res.ok) throw new Error("Failed to toggle coupon");
      fetchAdminData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault(); // STOP THE PAGE FROM REFRESHING
    console.log('🚀 BROADCAST INITIATED: Button clicked.');

    if (!broadcastTitle || !broadcastMessage) {
      toast.error("Tile and Message are required");
      return;
    }

    setIsBroadcasting(true);
    setStatusMessage('');
    
    try {
      console.log('📤 SENDING PROMPT:', { broadcastTitle, broadcastMessage, broadcastType });
      
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: broadcastTitle,
          message: broadcastMessage,
          type: broadcastType
        })
      });

      console.log('📥 SERVER RESPONSE:', res);
      const result = await res.json();
      
      if (!res.ok) {
        setStatusMessage('❌ Error: ' + (result.error || result.message || 'Failed to send broadcast'));
        toast.error(result.error || "Failed to send broadcast");
      } else {
        setStatusMessage('✅ Success: Broadcast sent to ' + result.count + ' users.');
        toast.success(`Success! Broadcast reached ${result.count} users.`);
        setBroadcastTitle('');
        setBroadcastMessage('');
      }
    } catch (err: any) {
      console.error('🔥 CRITICAL CATCH:', err);
      setStatusMessage('❌ System Error: ' + (err.message || 'Check console'));
      toast.error("Internal system error occurred");
    } finally {
      setIsBroadcasting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-indigo-500" />
              <h1 className="text-3xl font-bold tracking-tight text-white">Command Center</h1>
            </div>
            <p className="text-slate-400 mt-1">SpendSense Admin Panel</p>
          </div>
          <Button variant="outline" onClick={onBack} className="bg-slate-900 border-slate-700 text-white hover:bg-slate-800">
            Exit Admin
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'coupons' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
          >
            <Ticket className="h-4 w-4" />
            Coupons
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'users' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
          >
            <Users className="h-4 w-4" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'broadcast' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
          >
            <Megaphone className="h-4 w-4" />
            Broadcasts
          </button>
        </div>

        {/* Content */}
        {activeTab === 'coupons' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Create New Coupon</CardTitle>
                <CardDescription className="text-slate-400">Generate access codes for promotional campaigns.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Code Name</label>
                    <Input required value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. EARLYBIRD" className="bg-slate-950 border-slate-800 text-white uppercase placeholder:normal-case" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Duration (Months)</label>
                    <Input required type="number" min="1" value={durationMonths} onChange={e => setDurationMonths(e.target.value)} className="bg-slate-950 border-slate-800 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Max Uses</label>
                    <Input required type="number" min="1" value={maxUses} onChange={e => setMaxUses(e.target.value)} className="bg-slate-950 border-slate-800 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Expires At (Optional)</label>
                    <Input type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} className="bg-slate-950 border-slate-800 text-white" />
                  </div>
                  <Button type="submit" disabled={isCreating} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                    {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4 mr-2" /> Generate</>}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-slate-950 text-slate-400 font-bold">
                    <tr>
                      <th className="px-6 py-4">Code</th>
                      <th className="px-6 py-4">Uses</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Expires</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.coupons.map((coupon) => (
                      <tr key={coupon._id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-white tracking-wider">{coupon.code}</td>
                        <td className="px-6 py-4">
                          <span className={coupon.currentUses >= coupon.maxUses ? "text-rose-400 font-bold" : "text-emerald-400"}>
                            {coupon.currentUses} / {coupon.maxUses}
                          </span>
                        </td>
                        <td className="px-6 py-4">{coupon.durationMonths} Months</td>
                        <td className="px-6 py-4 text-slate-400">
                          {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-6 py-4">
                          {coupon.isActive ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400">
                              <XCircle className="h-3.5 w-3.5" /> Deactivated
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleToggleCoupon(coupon._id, coupon.isActive)}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            {coupon.isActive ? <ToggleRight className="h-6 w-6 text-emerald-500" /> : <ToggleLeft className="h-6 w-6" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {data.coupons.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No coupons generated yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-slate-950 text-slate-400 font-bold">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4">Pro Expiry</th>
                      <th className="px-6 py-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map((u) => (
                      <tr key={u._id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{u.name || 'Anonymous'}</td>
                        <td className="px-6 py-4 text-slate-300">{u.email}</td>
                        <td className="px-6 py-4">
                          {u.isPro ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 uppercase tracking-wider border border-indigo-500/20">
                              {u.plan || 'PRO'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 uppercase tracking-wider">
                              Free
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-400">
                          {u.proExpiresAt ? new Date(u.proExpiresAt).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'broadcast' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <Card className="bg-slate-900 border-slate-800 max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white">New Global Announcement</CardTitle>
                <CardDescription className="text-slate-400">This will insert a notification for EVERY user in the database. Use wisely.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBroadcast} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Announcement Title</label>
                    <Input 
                      required 
                      value={broadcastTitle} 
                      onChange={e => setBroadcastTitle(e.target.value)} 
                      placeholder="e.g. 🎉 New Feature: Budget Planner" 
                      className="bg-slate-950 border-slate-800 text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Message Body</label>
                    <textarea 
                      required 
                      value={broadcastMessage} 
                      onChange={e => setBroadcastMessage(e.target.value)} 
                      placeholder="Describe the update or promotion..."
                      className="w-full min-h-[120px] rounded-md bg-slate-950 border border-slate-800 p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Category</label>
                      <select 
                        value={broadcastType}
                        onChange={e => setBroadcastType(e.target.value as any)}
                        className="w-full h-10 rounded-md bg-slate-950 border border-slate-800 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="global">📢 Global Announcement</option>
                        <option value="system">🤖 System Update</option>
                        <option value="gamification">🏆 Challenge/Achievement</option>
                        <option value="billing">💰 Billing/Subscription</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <Button 
                      type="submit" 
                      disabled={isBroadcasting} 
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-500/20"
                    >
                      {isBroadcasting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Broadcasting...
                        </>
                      ) : (
                        <><Send className="h-5 w-5 mr-2" /> Broadcast to All Users</>
                      )}
                    </Button>

                    {statusMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl text-sm font-medium ${
                          statusMessage.includes('✅') 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {statusMessage}
                      </motion.div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
