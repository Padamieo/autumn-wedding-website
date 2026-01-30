'use client'

import getGuests from '@/firebase/firestore/getGuests';
import { GuestData, MinimalGuestData } from '@/types';
import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction, useMemo } from 'react';
import { useAuthContext } from './AuthContext';


export type GuestDataVariable = MinimalGuestData[] | GuestData[];

export type GuestConstruct = {
  code: string;
  guests: GuestDataVariable,
}

export interface SearchThing {
  userCode: string | undefined;
  setUserCode: Dispatch<SetStateAction<string | undefined>>;
  submittedCode: string | undefined;
  setSubmittedCode: Dispatch<SetStateAction<string | undefined>>;
  guestConstruct: GuestConstruct | undefined;
  guests: GuestDataVariable;
};

export const initialState: SearchThing = {
  userCode: undefined,
  setUserCode: () => {},
  submittedCode: undefined,
  setSubmittedCode: () => {},
  guestConstruct: undefined,
  guests: [],
};

export const SearchContext = createContext<SearchThing>(initialState);

export const useSearchContext = () => useContext(SearchContext);

interface SearchContextProviderProps {
  children: ReactNode;
}

export function SearchContextProvider({ children }: SearchContextProviderProps) {
  const { user } = useAuthContext() as { user: any };

  const [userCode, setUserCode] = useState<string | undefined>(undefined);
  const [submittedCode, setSubmittedCode] = useState<string | undefined>(undefined);

  // const [loading, setLoading] = useState(true);
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
    const { result, error } = await getGuests();

    if (error) {
      console.log(error);
      // setLoading(false);
      return; 
    }

    // console.log('data', result)

    result && Array.isArray(result) && setGuests(result);
    // setLoading(false);
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
      guests: [filterGuest, ...guestGroup],
    });
  }, [filterGuest]);

  useEffect(() => {
    // console.log(xx);
    if (returningUser && returningUser.code) {
      setSubmittedCode(returningUser.code);
      setUserCode(returningUser.code);
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
    <SearchContext.Provider value={{ guests, guestConstruct, userCode, setUserCode, submittedCode, setSubmittedCode }}>
      {children}
    </SearchContext.Provider>
  );
}
