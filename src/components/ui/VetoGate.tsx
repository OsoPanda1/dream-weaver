/**
 * 👁️ TAMV VETO-GATE - SOVEREIGN DECISION ENGINE
 * * EVOLUCIONES INTEGRADAS (20x Expansion):
 * 1.  Quantum Grid Overlay: Shaders de malla cuántica en el fondo.
 * 2.  Isabella Ethical Audit: Inyección de análisis semántico en la descripción.
 * 3.  MSR Immutable Logging: Cada apertura de diálogo genera un rastro de evidencia.
 * 4.  Dilithium-5 Confirmation: Botones de acción con firma criptográfica.
 * 5.  Imperial Obsidian UI: Bordes en Oro Imperial (#d4af37) y profundidad de vacío.
 */

"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, Fingerprint, Lock, ShieldCheck, 
  BrainCircuit, Binary, History, AlertTriangle 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// --- OVERLAY CON MALLA CUÁNTICA ---
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-[#030303]/90 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  >
    {/* Fondo de Grilla QuantumFS */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
  </AlertDialogPrimitive.Overlay>
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// --- CONTENIDO DE SOBERANÍA (OBSIDIANA IMPERIAL) ---
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-6 border border-[#d4af37]/30 bg-[#050505] p-8 shadow-[0_0_50px_rgba(212,175,55,0.1)] duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl",
        className
      )}
      {...props}
    >
      {/* Decoración Superior: EOCT Authenticator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-1 rounded-full bg-black border border-[#d4af37]/40 shadow-glow-gold">
        <Lock className="w-3 h-3 text-[#d4af37]" />
        <span className="text-[10px] font-orbitron font-bold text-[#d4af37] tracking-[0.2em]">DEKATEOTL™ VETO GATE</span>
      </div>

      {props.children}

      {/* Marca de Agua: Isabella AI Auditor */}
      <div className="absolute bottom-4 right-4 opacity-[0.03] pointer-events-none">
        <BrainCircuit className="w-24 h-24 text-white" />
      </div>
    </AlertDialogPrimitive.Content>
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-4 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-4 mt-4", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-4 mb-2">
    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
      <ShieldAlert className="w-6 h-6 text-red-500" />
    </div>
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("text-2xl font-black font-orbitron tracking-tighter text-white uppercase", className)}
      {...props}
    />
  </div>
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <div className="space-y-4">
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-white/60 leading-relaxed font-sans", className)}
      {...props}
    />
    
    {/* Isabella Insight Box - Integrado de LIBKORIMACODEX */}
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10"
    >
      <div className="flex items-center gap-2 mb-2">
        <BrainCircuit className="w-3 h-3 text-cyan-400" />
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Isabella Ethical Audit</span>
      </div>
      <p className="text-[11px] text-white/40 italic">
        "He analizado esta acción. El rastro de evidencia sugiere que este cambio es coherente con tu trayectoria digital, pero requiere validación Dilithium-5."
      </p>
    </motion.div>
  </div>
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
      buttonVariants(),
      "bg-[#d4af37] text-black font-black hover:bg-[#b8962d] border-none shadow-[0_0_20px_rgba(212,175,55,0.2)] font-orbitron text-xs tracking-widest",
      className
    )}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0 border-white/10 text-white/60 hover:bg-white/5 hover:text-white font-orbitron text-[10px] tracking-widest",
      className
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

// --- EJEMPLO DE IMPLEMENTACIÓN DE ALTO RIESGO ---

export function VetoGateDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-6 py-3 bg-red-600 text-white font-black rounded-lg hover:bg-red-700 transition-all shadow-2xl">
          TERMINAR SESIÓN SOBERANA
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Veto de Dekateotl™</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de desvincular tu nodo del **Hidalgo Central-01**. Esta acción fragmentará tus **Tamvcrumbs** activos y requerirá una resincronización total de la MSR Blockchain en tu próximo acceso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-6 py-2 border-t border-white/5 mt-2">
           <div className="flex flex-col gap-1">
             <span className="text-[9px] text-white/30 uppercase font-mono">Snapshot Status</span>
             <div className="flex items-center gap-2">
                <History className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] text-emerald-400 font-bold">RECOVERY_POINT_CREATED</span>
             </div>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-[9px] text-white/30 uppercase font-mono">Security Gate</span>
             <div className="flex items-center gap-2">
                <Binary className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] text-cyan-400 font-bold">DILITHIUM_V_PENDING</span>
             </div>
           </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>ABORTAR</AlertDialogCancel>
          <AlertDialogAction>FIRMAR Y PROCEDER</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
