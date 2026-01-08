import { useState } from 'react';

interface AuditEntry {
  id: string;
  action: string;
  actor: string;
  timestamp: Date;
  hash: string;
}

export function useBookPI() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const logAction = async (action: string, actor: string) => {
    const entry: AuditEntry = {
      id: crypto.randomUUID(),
      action,
      actor,
      timestamp: new Date(),
      hash: `0x${Math.random().toString(16).slice(2, 18)}`,
    };
    setEntries(prev => [entry, ...prev]);
    return entry;
  };

  const fetchEntries = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return { entries, isLoading, logAction, fetchEntries };
}
