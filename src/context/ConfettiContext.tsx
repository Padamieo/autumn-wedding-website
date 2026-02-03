'use client'

import ConfettiOverlay from '@/components/Confetti';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface Confetti {
  showConfetti: boolean;
  setConfetti: Dispatch<SetStateAction<boolean>>;
};

export const initialState: Confetti = {
  showConfetti: false,
  setConfetti: () => {},
};

export const ConfettiContext = createContext<Confetti>(initialState);

export const useConfettiContext = () => useContext(ConfettiContext);

interface ConfettiContextProviderProps {
  children: ReactNode;
}

export function ConfettiContextProvider({ children }: ConfettiContextProviderProps) {
  const [showConfetti, setConfetti] = useState(false);

  return (
    <ConfettiContext.Provider value={{
      showConfetti,
      setConfetti
    }}>
      <ConfettiOverlay />
      {children}
    </ConfettiContext.Provider>
  );
}
