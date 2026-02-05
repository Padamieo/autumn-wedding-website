'use client'

import getGuests from '@/firebase/firestore/getGuests';
import { GuestData, GuestUpdatePayload, MinimalGuestData } from '@/types';
import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction, useMemo } from 'react';
import { useAuthContext } from './AuthContext';
import { useNotificationContext } from './NotificationContext';

export type GuestDataVariable = MinimalGuestData[] & GuestData[];

export type GuestConstruct = {
  code: string;
  guests: GuestDataVariable,
}

export interface SearchThing {
  clearUser: () => void;
  guestConstruct: GuestConstruct | undefined;
  guests: GuestDataVariable;
  setSubmittedCode: Dispatch<SetStateAction<string | undefined>>;
  setUserCode: Dispatch<SetStateAction<string | undefined>>;
  submittedCode: string | undefined;
  updateGuestsStore: ( guestsData: GuestUpdatePayload ) => void;
  userCode: string | undefined;
};

export const initialState: SearchThing = {
  clearUser: () => {},
  guestConstruct: undefined,
  guests: [],
  setSubmittedCode: () => {},
  setUserCode: () => {},
  submittedCode: undefined,
  updateGuestsStore: () => {},
  userCode: undefined,
};

export const SearchContext = createContext<SearchThing>(initialState);

export const useSearchContext = () => useContext(SearchContext);

interface SearchContextProviderProps {
  children: ReactNode;
}

export function SearchContextProvider({ children }: SearchContextProviderProps) {
  const { user } = useAuthContext() as { user: any };
  const { createError } = useNotificationContext();
  const [userCode, setUserCode] = useState<string | undefined>(undefined);
  const [submittedCode, setSubmittedCode] = useState<string | undefined>(undefined);
  const [guests, setGuests] = useState<GuestDataVariable>([]);
  const [guestConstruct, setGuestConstruct] = useState<GuestConstruct | undefined>(undefined);

  const filterGuest = useMemo<MinimalGuestData | GuestData | undefined>(
    () => (guests && guests.filter((person) => {
      return userCode && person.participation !== 1 && (
        person.code.toLowerCase() == userCode.toLowerCase()
      )
    }).shift()),
    [userCode],
  );

  const returningUser = useMemo(
    () => (guests && guests.filter(
      (person) => person.user !== '' && user?.uid && person.user === user.uid,
    ).shift()),
    [guests, user],
  );

  const getGuestsData = async () => {
    const { result, error } = await getGuests(user ?  user.uid : undefined);

    if (error) {
      console.log(error);
      createError();
      return; 
    }

    result && Array.isArray(result) && setGuests(result);
  };

  const updateGuestsStore = ( guestsUpdateData: GuestUpdatePayload ) => {
    const ids = Object.keys(guestsUpdateData).map((key) => key);

    const updated = guests.map(guest => {
      return ids.includes(guest.code) ? {
        ...guest,
        ...guestsUpdateData[guest.code]
      } : guest;
    }) as GuestDataVariable;
    setGuests(updated);
  }

  const clearUser = () => {
    setCodes(undefined);
    setGuestConstruct(undefined);
  };

  const setCodes = (value: string | undefined ) => {
    setSubmittedCode(value);
    setUserCode(value);
  };

  useEffect(() => {
    if (!userCode || !filterGuest) {
      return;
    }

    const guestGroup = guests.reduce((acc, guest) => 
      filterGuest.relationships.includes(guest.id) ? [guest, ...acc] : acc,
      [] as MinimalGuestData[] | GuestData[],
    ) || [];

    guestGroup.sort((a, b) => {
      return a.participation - b.participation;
    });

    setGuestConstruct({
      code: filterGuest.code,
      guests: [filterGuest, ...guestGroup] as GuestDataVariable,
    });
  }, [filterGuest]);

  useEffect(() => {
    if (returningUser && returningUser.code) {
      setCodes(returningUser.code);
    }
  }, [returningUser]);

  useEffect(() => {
    // get user data, be nice to optmize to reduce calls for data on every refresh
    getGuestsData();
    // console.log(user?.uid)
    // NOTE: may use this for more than setting userCode
    // setSubmittedCode('AA10');
  }, []);

  return (
    <SearchContext.Provider value={{
      clearUser,
      guestConstruct,
      guests,
      setSubmittedCode,
      setUserCode,
      submittedCode,
      updateGuestsStore,
      userCode
    }}>
      {children}
    </SearchContext.Provider>
  );
}
