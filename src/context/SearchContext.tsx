'use client'

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface SearchThing {
  userCode: string | undefined;
  setUserCode: Dispatch<SetStateAction<string | undefined>>;
};

export const initialState: SearchThing = {
  userCode: undefined,
  setUserCode: () => {}
};

export const SearchContext = createContext<SearchThing>(initialState);


export const useSearchContext = () => useContext(SearchContext);

interface SearchContextProviderProps {
  children: ReactNode;
}

export function SearchContextProvider({ children }: SearchContextProviderProps) {
  const [userCode, setUserCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    // NOTE: may use this for more than setting userCode
    return;
  }, []);

  return (
    <SearchContext.Provider value={{ userCode, setUserCode }}>
      {children}
    </SearchContext.Provider>
  );
}
