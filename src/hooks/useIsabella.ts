import { useState, useCallback } from 'react';

interface IsabellaState {
  mood: 'neutral' | 'happy' | 'thinking' | 'alert';
  activity: string;
  lastInteraction: Date | null;
}

export function useIsabella() {
  const [state, setState] = useState<IsabellaState>({
    mood: 'neutral',
    activity: 'Esperando...',
    lastInteraction: null,
  });

  const setMood = useCallback((mood: IsabellaState['mood']) => {
    setState(prev => ({ ...prev, mood, lastInteraction: new Date() }));
  }, []);

  const setActivity = useCallback((activity: string) => {
    setState(prev => ({ ...prev, activity }));
  }, []);

  return { ...state, setMood, setActivity };
}
