/**
 * 👑 TAMV MD-X4™ MASTER KERNEL INTERFACE
 * INTEGRACIÓN TOTAL: Korima Codex + Isabella Core + MSR Ledger
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, BrainCircuit, Activity, Lock, 
  Zap, Database, Globe, Fingerprint, AlertOctagon 
} from "lucide-react";

// --- HOOKS DE INFRAESTRUCTURA SOBERANA ---
import { useAnubisSentinel } from "@/hooks/useAnubis";
import { useIsabellaContext } from "@/hooks/useIsabella";
import { useMSRLedger } from "@/hooks/useMSR";

export default function TamvMasterKernel() {
  const { auditStatus, threatLevel } = useAnubisSentinel();
  const { currentEmotion, semanticState } = useIsabellaContext();
  const { lastBlock, syncStatus } = useMSRLedger();

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 font-sans selection:bg-[#d4af37]/30">
      
      {/* 🌌 BARRA DE ESTADO DE SOBERANÍA (L0 HUB) */}
      <header className="flex justify-between items-center mb-12 border-b border-[#d4af37]/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8a6d1d] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <ShieldCheck className="text-black w-7 h-7" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" 
            />
          </div>
          <div>
            <h1 className="text-xl font-black font-orbitron tracking-widest">TAMV MD-X4™</h1>
            <p className="text-[10px] text-[#d4af37] font-bold uppercase tracking-[0.3em]">Quantum Sovereign Kernel</p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <div className="text-right">
            <span className="text-[9px] text-white/30 block uppercase">MSR Sync Status</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">{syncStatus}% SECURED</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-right">
            <span className="text-[9px] text-white/30 block uppercase">Anubis Sentinel</span>
            <span className={`text-xs font-bold ${threatLevel === 'LOW' ? 'text-emerald-400' : 'text-red-500'}`}>
              {threatLevel} THREAT
            </span>
          </div>
        </div>
      </header>

      <main className="grid lg:grid-cols-12 gap-8">
        
        {/* 🧠 COLUMNA IZQUIERDA: ISABELLA AI SEMANTIC BRAIN */}
        <section className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BrainCircuit className="w-24 h-24 text-[#d4af37]" />
            </div>
            <h2 className="text-sm font-bold text-[#d4af37] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Isabella NextGen State
            </h2>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-[#d4af37]/30 p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs text-white/40 leading-relaxed italic">
                    "Detecto una coherencia del 98% en el flujo de datos. Tu rastro de evidencia es inmutable."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[8px] text-white/40 block uppercase">Context Memory</span>
                  <span className="text-xs font-bold font-mono">1.4 TB (HyperGraph)</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[8px] text-white/40 block uppercase">Logic Engine</span>
                  <span className="text-xs font-bold font-mono text-purple-400">EOCT-REASONING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🏛️ COLUMNA CENTRAL: QUANTUM DASHBOARD (THE VAULT) */}
        <section className="lg:col-span-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <MetricCard icon={Fingerprint} label="Sovereign Identity" value="VERIFIED" color="text-cyan-400" />
            <MetricCard icon={Database} label="QuantumFS Nodes" value="128 Active" color="text-[#d4af37]" />
            <MetricCard icon={Lock} label="Encryption" value="DILITHIUM-5" color="text-emerald-400" />
          </div>

          <div className="p-8 rounded-3xl bg-[#050505] border border-[#d4af37]/20 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold font-orbitron">MSR LEDGER LIVE STREAM</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] text-white/30 uppercase">Inmutable Audit Trail</span>
              </div>
            </div>
            
            <div className="space-y-4 font-mono">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-lg bg-white/5 border-l-4 border-[#d4af37]">
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-500 text-xs">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-white/70 text-xs uppercase tracking-tighter">BLOCK_COMMIT_TAMV_{i}X44</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#d4af37]">0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ⚠️ PROTOCOLO VETO (ANUBIS OVERRIDE) */}
      <AnimatePresence>
        {threatLevel === 'HIGH' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 bg-red-950/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center space-y-6">
              <AlertOctagon className="w-24 h-24 text-red-500 mx-auto animate-bounce" />
              <h1 className="text-4xl font-black font-orbitron">VETO GATE ACTIVE</h1>
              <p className="text-white/70">
                Se ha detectado una anomalía en la firma Dilithium-5. Dekateotl™ ha bloqueado el acceso al nodo central.
              </p>
              <button className="px-8 py-4 bg-white text-black font-black rounded-full hover:scale-105 transition-transform">
                INICIAR RECUPERACIÓN FÉNIX
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4af37]/40 transition-all group">
      <Icon className={cn("w-6 h-6 mb-4", color)} />
      <span className="text-[9px] text-white/30 block uppercase mb-1">{label}</span>
      <span className="text-sm font-black tracking-widest text-white group-hover:text-[#d4af37] transition-colors">{value}</span>
    </div>
  );
}
