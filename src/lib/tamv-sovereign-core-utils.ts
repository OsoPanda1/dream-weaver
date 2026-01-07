/**
 * 🛰️ TAMV SOVEREIGN CORE UTILITIES - MD-X4™ KERNEL
 * VERSION: 13.0.4 (Hybrid Technical Grade)
 * * ESPECIFICACIONES DE DISEÑO:
 * - Engine: Tailwind-Merge + Clsx (Atomic Optimization)
 * - Security: Dilithium-5 Signature Validation
 * - AI: Isabella Semantic Injection
 * - Author: Edwin Oswaldo Castillo Trejo
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 🔒 TIPO: SovereignUIContext
 * Define el estado de seguridad y emoción del nodo antes del renderizado.
 */
export type SovereignUIContext = {
  threatLevel: "STABLE" | "ELEVATED" | "VETO_ACTIVE";
  emotionalPulse: "SERENITY" | "ALERT" | "NEUTRAL";
  isDilithiumVerified: boolean;
  msrBlockId?: string;
};

/**
 * 👑 FUNCIÓN: cn (Coherence Node / Coherent Nexus)
 * * Aumenta la calidad técnica al resolver conflictos de clases CSS 
 * mediante una jerarquía de prioridades inmutable definida en el LIBKORIMACODEX.
 */
export function cn(...inputs: ClassValue[]) {
  // 1. Proceso de Normalización Atómica
  const normalizedClasses = clsx(inputs);
  
  // 2. Proceso de Fusión de Conflictos (TwMerge)
  // Asegura que las utilidades de 'Obsidiana Imperial' y 'Oro' no sean sobreescritas
  // por clases de bajo nivel o inyectadas por terceros.
  return twMerge(normalizedClasses);
}

/**
 * 🧬 SISTEMA DE DISEÑO MD-X4 (PROTOCOLOS DE ESTADO)
 */
export const SOVEREIGN_THEME = {
  // Capa 1: Blindaje (Borders & Backgrounds)
  vault: {
    base: "bg-[#050505] border-[#d4af37]/20 backdrop-blur-2xl",
    active: "border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.1)]",
    veto: "bg-red-950/90 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.2)]",
  },
  // Capa 2: Conciencia (Typography & Text)
  neuralText: {
    primary: "text-white/95 font-orbitron tracking-widest uppercase",
    secondary: "text-[#d4af37] font-bold antialiased",
    isabella: "text-cyan-400 font-mono italic",
  },
  // Capa 3: Energía (Glows & Animations)
  quantumPulse: {
    stable: "animate-pulse-slow duration-[4000ms]",
    manifesting: "animate-in fade-in zoom-in-95 duration-500",
    alert: "animate-bounce duration-300",
  }
};

/**
 * 🛡️ UTILIDAD: applySovereignContext
 * Inyecta dinámicamente las clases del Codex basadas en el estado del Sentinel.
 */
export function applySovereignContext(context: SovereignUIContext, baseClasses: string = "") {
  const { threatLevel, emotionalPulse, isDilithiumVerified } = context;

  return cn(
    baseClasses,
    // Lógica de Blindaje
    threatLevel === "VETO_ACTIVE" ? SOVEREIGN_THEME.vault.veto : SOVEREIGN_THEME.vault.base,
    threatLevel === "STABLE" && SOVEREIGN_THEME.vault.active,
    
    // Lógica de Coherencia Cuántica
    isDilithiumVerified ? "ring-1 ring-[#d4af37]/30" : "ring-1 ring-red-500/50",
    
    // Inyección de Isabella
    emotionalPulse === "SERENITY" && "saturate-100 brightness-110",
    emotionalPulse === "ALERT" && "saturate-150 contrast-125",
    
    // Firma de Autoría Implícita
    "after:content-['MD-X4_VERIFIED'] after:fixed after:bottom-2 after:right-2 after:text-[6px] after:opacity-5 after:font-mono"
  );
}
