import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, Lock, Fingerprint, Activity, Zap, 
  Binary, RefreshCcw
} from 'lucide-react';
import { Card } from '@/components/ui/card';

type SentinelStatus = 'OPTIMAL' | 'DEGRADED' | 'INTRUSION_DETECTED' | 'ROLLBACK_ACTIVE';

interface MSRRecord {
  id: string;
  timestamp: string;
  action: string;
  proof: string;
  status: 'VERIFIED' | 'PENDING';
}

interface QuantumMetric {
  id: string;
  label: string;
  value: number;
  entropy: number;
  icon: React.ElementType;
}

const MSRLedger = ({ records }: { records: MSRRecord[] }) => (
  <div className="mt-4 space-y-2 max-h-32 overflow-y-auto pr-2">
    <p className="text-[10px] uppercase tracking-widest text-primary/50 mb-2 font-bold">MSR Privacy Ledger (BookPI)</p>
    {records.map((rec) => (
      <motion.div 
        initial={{ x: -20, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }}
        key={rec.id} 
        className="flex items-center justify-between text-[10px] font-mono border-l border-primary/30 pl-2 py-1 bg-muted/50"
      >
        <span className="text-primary">[{rec.timestamp}]</span>
        <span className="text-muted-foreground truncate px-2">{rec.action}</span>
        <span className="text-secondary truncate w-16">{rec.proof.substring(0, 8)}...</span>
      </motion.div>
    ))}
  </div>
);

export const AnubisSentinelSystem = () => {
  const [status, setStatus] = useState<SentinelStatus>('OPTIMAL');
  const [metrics, setMetrics] = useState<QuantumMetric[]>([
    { id: 'auth', label: 'DILITHIUM-5 AUTH', value: 100, entropy: 0.02, icon: Fingerprint },
    { id: 'msr', label: 'MSR SYNC RATE', value: 99.8, entropy: 0.05, icon: Binary },
    { id: 'gate', label: 'DEKATEOTL GATES', value: 100, entropy: 0.01, icon: Lock },
    { id: 'rex', label: 'FÉNIX RESILIENCE', value: 100, entropy: 0.00, icon: RefreshCcw },
  ]);
  const [msrRecords, setMsrRecords] = useState<MSRRecord[]>([]);
  const [scanning, setScanning] = useState(false);

  const executeQuantumAudit = async () => {
    setScanning(true);
    setStatus('OPTIMAL');
    
    const phases = ['ANUBIS_INIT', 'DEKATEOTL_VETO_CHECK', 'MSR_CONSENSUS', 'SOVEREIGN_FINALITY'];
    
    for (const phase of phases) {
      setMsrRecords(prev => [{
        id: phase,
        timestamp: new Date().toLocaleTimeString(),
        action: `Executing ${phase}...`,
        proof: 'PENDING',
        status: 'PENDING'
      }, ...prev]);
      await new Promise(r => setTimeout(r, 800));
    }
    
    setScanning(false);
  };

  return (
    <Card className="relative overflow-hidden bg-card border-primary/30 text-foreground p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <Binary className="w-24 h-24 text-primary" />
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <motion.div
            animate={scanning ? { rotateY: [0, 180, 360], scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-sm flex items-center justify-center"
          >
            <ShieldAlert className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-primary">ANUBIS SENTINEL <span className="text-muted-foreground">v4.0</span></h2>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Protocolo Zero-Trust Activo</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-1 font-mono">SOVEREIGNTY_SCORE</div>
          <div className="text-3xl font-black font-mono text-foreground">99.98%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {metrics.map((m) => (
          <div key={m.id} className="bg-muted/50 border border-border p-3 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <m.icon className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold tracking-widest">{m.label}</span>
              </div>
              <span className="text-[10px] font-mono text-primary">+{m.entropy.toFixed(4)}% ENTROPY</span>
            </div>
            <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${m.value}%` }}
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" 
              />
            </div>
          </div>
        ))}
      </div>

      <MSRLedger records={msrRecords} />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={executeQuantumAudit}
        disabled={scanning}
        className="w-full mt-6 py-4 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 rounded-md"
      >
        {scanning ? (
          <Activity className="animate-spin w-4 h-4" />
        ) : (
          <Zap className="w-4 h-4" />
        )}
        {scanning ? 'Sincronizando con Isabella...' : 'Ejecutar Auditoría de Soberanía'}
      </motion.button>

      <div className="mt-4 flex justify-between items-center text-[8px] text-muted-foreground font-mono tracking-tighter">
        <span>KODEX: ANUBIS-SENTINEL-SHIELD-01</span>
        <span>LATENCY: 0.0004ms</span>
        <span>ENCRYPTION: DILITHIUM-V_READY</span>
      </div>
    </Card>
  );
};

export default AnubisSentinelSystem;
