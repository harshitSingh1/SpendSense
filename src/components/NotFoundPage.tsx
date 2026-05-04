import React from "react";
import { motion } from "motion/react";
import { Coins, IndianRupee, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#030014] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dark grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }}
      />

      {/* Wormhole Animation */}
      <div className="relative z-10 flex items-center justify-center mb-16 w-64 h-64">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 border border-indigo-500/30 rounded-full shadow-[0_0_50px_rgba(79,70,229,0.15)]"
        />
        <motion.div 
          animate={{ scale: [0.8, 0.85, 0.8] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-4 border border-emerald-500/20 rounded-full border-dashed"
        />
        <motion.div 
          animate={{ scale: [0.6, 0.65, 0.6] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
          className="absolute inset-10 border border-indigo-500/40 rounded-full"
        />
        
        {/* Swirling Elements */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 0, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 10, ease: "linear" }, scale: { repeat: Infinity, duration: 10, ease: "easeInOut" } }}
          className="absolute w-full h-full"
        >
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-emerald-500/60">
            <IndianRupee className="w-8 h-8" />
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ rotate: -360, scale: [1, 0, 1] }}
          transition={{ rotate: { repeat: Infinity, duration: 15, ease: "linear" }, scale: { repeat: Infinity, duration: 15, ease: "easeInOut" } }}
          className="absolute w-full h-full"
        >
          <div className="absolute bottom-6 right-8 text-indigo-400/60">
            <Coins className="w-6 h-6" />
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ rotate: 360, scale: [0.5, 1.5, 0.5], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
           <TrendingDown className="w-10 h-10 text-rose-500/40" />
        </motion.div>
        
        {/* Core glow */}
        <div className="absolute inset-1/3 bg-emerald-500/10 blur-xl rounded-full" />
      </div>

      {/* Typography */}
      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Radar Ping */}
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md"
          />
          <h1 className="text-8xl md:text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.6)] mb-2 relative z-10">
            404
          </h1>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-200 mb-4 drop-shadow-sm tracking-tight">
          A glitch in the trajectory.
        </h2>
        
        <p className="text-slate-400 max-w-md mx-auto mb-10 leading-relaxed font-medium">
          Even Stocrates can't predict this path. The asset or page you are seeking exists only in an unmapped dimension.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={onBack}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-6 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all border border-emerald-400"
          >
            Recalculate Path: Return to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
