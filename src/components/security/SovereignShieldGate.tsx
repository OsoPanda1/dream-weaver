import { ReactNode } from 'react';

interface SovereignShieldGateProps {
  children: ReactNode;
}

export function SovereignShieldGate({ children }: SovereignShieldGateProps) {
  // Security wrapper - can add rate limiting, bot detection, etc.
  return <>{children}</>;
}
