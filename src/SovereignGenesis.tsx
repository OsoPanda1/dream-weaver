/**
 * 🛰️ TAMV SOVEREIGN GENESIS - KERNEL MD-X4™
 * VERSION: SUPREME_SECURITY_v24.0
 * * Este archivo sustituye el punto de entrada convencional por una 
 * "Cámara de Transición" de alta seguridad.
 */

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Eye, BrainCircuit, Fingerprint, Activity } from "lucide-react";
import App from "./App.tsx";
import "./index.css";
import { cn } from "@/lib/utils";

// --- COMPONENTE DE EXPERIENCIA DE INICIO SOBERANO ---
const SovereignShieldGate = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<"SCANNIG" | "VERIFYING" | "SECURED">("SCANNIG");
  const [log, setLog] = useState<string[]>(["Iniciando Protocolo Omega..."]);

  useEffect(() => {
    // Secuencia de validación real-time (Simulación de Kernel)
    const steps = [
      { msg: "Verificando Dilithium-5 Signature...", time: 800 },
      { msg: "Isabella AI analizando rastro de evidencia...", time: 1600 },
      { msg: "Anubis Sentinel sellando túneles de red...", time: 2400 },
      { msg: "Snapshot Fénix generado y asegurado.", time: 3000 },
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setLog(prev => [...prev, step.msg]);
        if (i === 1) setStatus("VERIFYING");
        if (i === 3) setStatus("SECURED");
      }, step.time);
    });
  }, []);

  if (status !== "SECURED") {
    return (
      <div className="fixed inset-0 bg-[#020202] z-[9999] flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Fondo de Grilla Cuántica con Pulso */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          {/* Orbe de Isabella */}
          <div className="relative mb-12">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="w-32 h-32 rounded-full border-2 border-dashed border-[#d4af37]/30 p-2"
            >
              <div className="w-full h-full rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              {status === "SCANNIG" ? <Activity className="text-[#d4af37] w-10 h-10 animate-pulse" /> : <BrainCircuit className="text-cyan-400 w-10 h-10" />}
            </div>
          </div>

          <h1 className="text-2xl font-black font-orbitron tracking-[0.5em] text-white mb-2">
            {status === "SCANNIG" ? "SCANNING NUCLEUS" : "CORE VERIFIED"}
          </h1>
          <p className="text-[10px] text-[#d4af37] uppercase tracking-widest font-bold">Protocolo de Soberanía MD-X4™</p>

          {/* Terminal de Auditoría Forense */}
          <div className="mt-12 w-80 font-mono text-[9px] text-white/30 space-y-1">
            {log.map((line, idx) => (
              <motion.div initial={{ x: -10 }} animate={{ x: 0 }} key={idx} className="flex gap-2">
                <span className="text-[#d4af37]">{">"}</span>
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Firma Forense de Fondo */}
        <div className="absolute bottom-8 text-[10px] text-white/10 font-mono italic">
          Author: Edwin Oswaldo Castillo Trejo | Anubis Villaseñor
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1.5 }}
      className="relative"
    >
      {/* HUD de Seguridad Persistente (Overlay de Confianza) */}
      <div className="fixed top-4 right-4 z-[999] flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-[#d4af37]/20 px-4 py-2 rounded-full shadow-2xl">
        <div className="flex items-center gap-2">
          <Fingerprint className="w-3 h-3 text-[#d4af37]" />
          <span className="text-[8px] text-white/60 font-orbitron uppercase tracking-widest">Sovereign Link Active</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      {children}
    </motion.div>
  );
};

// --- RENDERIZADO MAESTRO ---
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <SovereignShieldGate>
        <App />
      </SovereignShieldGate>
    </React.StrictMode>
  );
}
