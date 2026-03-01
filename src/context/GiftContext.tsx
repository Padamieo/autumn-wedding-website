'use client'

import Popup from '@/components/sections/Popup';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface Gift {
  showPopup: boolean;
  closeModal: () => void;
  openModal: () => void;
};

export const initialState: Gift = {
  showPopup: false,
  closeModal: () => {},
  openModal: () => {},
};

export const GiftContext = createContext<Gift>(initialState);

export const useGiftContext = () => useContext(GiftContext);

interface GiftContextProviderProps {
  children: ReactNode;
}

export function GiftContextProvider({ children }: GiftContextProviderProps) {
  const [showPopup, setPopup] = useState(false);
  
  const closeModal = () => {
    setPopup(false);
  }

  const openModal = () => {
    setPopup(true);
  }

  return (
    <GiftContext.Provider value={{
      showPopup,
      closeModal,
      openModal
    }}>
      <Popup />
      {children}
    </GiftContext.Provider>
  );
}
