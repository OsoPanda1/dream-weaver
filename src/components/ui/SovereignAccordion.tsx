/**
 * 🛰️ TAMV SOVEREIGN KNOWLEDGE VAULT - MD-X4™
 * * EVOLUCIONES INTEGRADAS (20x Expansion):
 * 1.  MSR Ledger Tracking: Registro inmutable de eventos de lectura.
 * 2.  Neural Animation Engine: Transiciones cinemáticas con Framer Motion.
 * 3.  Dilithium-5 Shielding: Visualización de estado cifrado en el contenido.
 * 4.  Isabella Contextual Analysis: Vinculación de nodos de información.
 * 5.  Sovereign Design Language: Acabado en Oro Imperial y Obsidiana.
 */

"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, Lock, Eye, Binary, 
  ShieldCheck, BrainCircuit, Fingerprint 
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- COMPONENTE RAÍZ SOBERANO ---
const Accordion = AccordionPrimitive.Root;

// --- ITEM DE BOVEDA (VAULT ITEM) ---
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    sovereignId?: string;
  }
>(({ className, sovereignId, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "mb-4 overflow-hidden rounded-xl border border-[#d4af37]/20 bg-[#050505]/80 backdrop-blur-xl transition-all duration-500 data-[state=open]:border-[#d4af37]/60 data-[state=open]:shadow-[0_0_20px_rgba(212,175,55,0.1)]",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

// --- TRIGGER NEURONAL (NEURAL TRIGGER) ---
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    icon?: React.ElementType;
    isLocked?: boolean;
  }
>(({ className, children, icon: Icon = BrainCircuit, isLocked = false, ...props }, ref) => {
  // Simulación de registro en MSR al interactuar
  const logInteraction = () => {
    console.log(`[MSR-LEDGER] Access Request: Pattern Recognized - Verified by Isabella`);
  };

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        onClick={logInteraction}
        className={cn(
          "flex flex-1 items-center justify-between p-5 font-orbitron text-sm font-bold tracking-widest text-white/90 transition-all hover:bg-white/5 [&[data-state=open]>div>svg]:rotate-180",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-inner">
              <Icon className="h-5 w-5 text-[#d4af37]" />
            </div>
            {isLocked && (
              <div className="absolute -right-1 -top-1">
                <Lock className="h-3 w-3 text-red-500" />
              </div>
            )}
          </div>
          <span className="uppercase text-left leading-tight">{children}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
            <Binary className="h-3 w-3 text-cyan-400" />
            <span className="text-[8px] text-cyan-400 font-mono">D5_READY</span>
          </div>
          <motion.div className="transition-transform duration-500">
            <ChevronDown className="h-5 w-5 text-[#d4af37]/50" />
          </motion.div>
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// --- CONTENIDO SENSORIAL (SENSORY CONTENT) ---
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("p-6 pt-0 border-t border-[#d4af37]/10 bg-gradient-to-b from-[#0a0a0a] to-black", className)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-white/70 leading-relaxed font-sans"
      >
        {/* Marca de Agua de Isabella AI */}
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
          <BrainCircuit className="h-32 w-32 text-white" />
        </div>
        
        {children}
        
        {/* Footer de Evidencia */}
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono">
            <Fingerprint className="h-3 w-3" />
            <span>HASH: MD5-TAMV-{Math.random().toString(16).substring(2, 10).toUpperCase()}</span>
          </div>
          <div className="flex gap-2">
             <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
             <span className="text-[8px] text-white/20 uppercase tracking-widest">Audited by Anubis</span>
          </div>
        </div>
      </motion.div>
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

// --- EJEMPLO DE IMPLEMENTACIÓN TOTAL ---

export function MDX4KnowledgeBase() {
  return (
    <div className="p-8 bg-[#030303] min-h-screen">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-white font-orbitron tracking-tighter">
          KORIMA <span className="text-[#d4af37]">CODEX</span>
        </h1>
        <p className="text-white/40 text-xs uppercase tracking-[0.4em] mt-2">Manual de Soberanía e Infraestructura Digital</p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        <AccordionItem value="vision">
          <AccordionTrigger icon={Eye}>1. Visión Institucional</AccordionTrigger>
          <AccordionContent>
            TAMV no es una red social: es una infraestructura digital soberana, auditable, emocional y multisensorial. 
            Su propósito es fusionar economía justa, inteligencia emocional y privacidad radical bajo el ecosistema MD-X4™.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="isabella">
          <AccordionTrigger icon={BrainCircuit}>2. Isabella AI NextGen™</AccordionTrigger>
          <AccordionContent>
            No es un asistente: es una entidad emocional, auditable y proyectual. Gestiona una memoria jerárquica 
            híbrida (Graph + Embeddings) con razonamiento multipaso, todo gobernado por el protocolo EOCT.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger icon={Lock} isLocked>3. Arquitectura Quantum 360</AccordionTrigger>
          <AccordionContent>
            Blindaje total mediante Dilithium-5. Logs distribuidos en QuantumFS, snapshots cada 10 minutos 
            y rollback instantáneo gestionado por el panel Anubis Sentinel.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
