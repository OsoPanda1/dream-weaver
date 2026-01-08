import { useState } from 'react';

export function useAnubis() {
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('high');
  const [threatDetected, setThreatDetected] = useState(false);
  const [lastScan, setLastScan] = useState<Date | null>(null);

  const runScan = async () => {
    setLastScan(new Date());
    setThreatDetected(false);
    return { clean: true, threats: 0 };
  };

  return { securityLevel, setSecurityLevel, threatDetected, lastScan, runScan };
}
