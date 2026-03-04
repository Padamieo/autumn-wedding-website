'use client'

import NotificationOverlay from '@/components/Notification';
import { useTranslations } from 'next-intl';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Notifications {
  closeNotification: (id: string) => void;
  createError: (notification?: Create) => void;
  createNotification: (notification: Create) => void;
  notifications: Notification[];
};

export const initialState: Notifications = {
  closeNotification: () => {},
  createError: () => {},
  createNotification: () => {},
  notifications: [],
};

export const NotificationContext = createContext<Notifications>(initialState);

export const useNotificationContext = () => useContext(NotificationContext);

interface NotificationContextProviderProps {
  children: ReactNode;
}

type NotificationTypes = 'error' | 'default';

type Notification = Required<Create>;

type Create = {
  id: string;
  message?: string;
  type?: NotificationTypes;
}

export function NotificationContextProvider({ children }: NotificationContextProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [count, setCount] = useState<number>(0);
  const t = useTranslations('notifications.error');
  const defaultMessage = t('default');

  const closeNotification = (id: string) => {
    const update = notifications.reduce(
      (acc, n) => n.id !== id ? [...acc, n] : acc, [] as Notification[]
    );
    setNotifications(update);
  };

  const createNotification = async ({ id, type = 'error', message }: Create) => {
    if(notifications.find((n) => n.id === id)){
      return;
    }
    let note = notifications;
    note.push({ id, type, message: message || defaultMessage });
    setNotifications(note);
    // NOTE: Does not update correctly unless also
    setCount(count + 1);
  };

  const createError = ( pass?: Create | string ) => {
    const isString = typeof pass === 'string';
    const id = isString ? `error-${pass}-${count}` : `error-${count}`;
    createNotification( !isString && pass || { id } );
  };


  return (
    <NotificationContext.Provider
      value={{
        closeNotification,
        createError,
        notifications,
        createNotification
      }}
    >
      <NotificationOverlay />
      {children}
    </NotificationContext.Provider>
  );
}
