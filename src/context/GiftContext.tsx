'use client'

import getAccount from "@/firebase/firestore/getAccount";
import Popup from '@/components/sections/Popup';
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { useNotificationContext } from "./NotificationContext";
import { useAuthContext } from "./AuthContext";
import { useTranslations } from "next-intl";

type BaseAccount = {
  accountName: string;
};

type Euros = BaseAccount & {
  iban: string;
};

type Pounds = BaseAccount & {
  sortCode: string;
  accountNumber: string;
};

type AccoundFormats = {
  euros: Euros;
  pounds: Pounds,
 };

export const defaultData = {
  euros: {
    accountName: 'A NAME',
    iban: 'NL0000000000',
  },
  pounds: {
    accountName: 'A NAME',
    sortCode: '00-00-00',
    accountNumber: '000000',
  }
};

export interface Gift {
  closeModal: () => void;
  data: AccoundFormats;
  openModal: () => void;
  setPassword: Dispatch<SetStateAction<string>>;
  showModal: boolean;
};

export const initialState: Gift = {
  closeModal: () => {},
  data: defaultData,
  openModal: () => {},
  setPassword: () => {},
  showModal: false,
};

export const GiftContext = createContext<Gift>(initialState);

export const useGiftContext = () => useContext(GiftContext);

interface GiftContextProviderProps {
  children: ReactNode;
}

export function GiftContextProvider({ children }: GiftContextProviderProps) {
  const { createError } = useNotificationContext();
  const [showModal, setModal] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState(defaultData);
  const { user } = useAuthContext() as { user: any };
  const t = useTranslations('notifications.error');
  
  const closeModal = () => {
    setModal(false);
  }

  const openModal = async () => {

    const token = await user.getIdToken();
    const { result, error } = await getAccount(token, password);    

    if (error) {
      if (error === 'invalid password') {
        createError(
          { id: 'invalid-password', type: 'error', message: t('password') }
        );
        console.log('error', error, password);
        // need to feedback error to input box
      } else {
        createError();
      }
      return;
    }

    result && setData(result as AccoundFormats);
    
    setModal(true);
  }

  return (
    <GiftContext.Provider value={{
      closeModal,
      data,
      openModal,
      setPassword,
      showModal,
    }}>
      <Popup />
      {children}
    </GiftContext.Provider>
  );
}
