'use client'

import getGuests from "@/firebase/firestore/getGuests";
import { GuestData } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { Button, GuestSearch, Response } from "./";
import { useSearchContext } from "@/context/SearchContext";

import output from '../../scripts/output.json';
import { GuestConstruct } from "./Response";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

export default function Rsvp() {
  const { user } = useAuthContext() as { user: any };
  const { userCode } = useSearchContext();
  const router = useRouter();

  const [guests, setGuests] = useState<GuestData[]>([]);
  // const [search, setSearch] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [guestConstruct, setGuestConstruct] = useState<GuestConstruct | undefined>(undefined);
  

  const filterGuest = useMemo(
    () => (guests && guests.filter((person) => {
      return userCode && person.participation !== 1 && (
        person.code.toLowerCase() == userCode.toLowerCase()
      )
    })[0]),
    [userCode],
  );

  const getGuestsData = async () => {
    const { result, error } = await getGuests();
    if (!error) {
      console.log(error);
      setLoading(false);
      return; 
    }
    const data = result?.docs.map((doc) => doc.data() as GuestData);
    data && setGuests(data);
    setLoading(false);
  }

  const getGuestsDataLocal = async () => {
    setGuests(output as unknown as GuestData[]);
    setLoading(false);
  }

  useEffect(() => {
    // get user data, no need if already have data
    // getGuestsData();
    getGuestsDataLocal();
  }, []);

  useEffect(() => {
    if (!userCode) {
      return;
    }

    const guestGroup = guests.reduce((acc, guest) => 
      filterGuest.relationships.includes(guest.id) ? [guest, ...acc] : acc,
      [] as GuestData[],
    ) || [];
    guestGroup.sort((a, b) => {
      return a.participation - b.participation;
    });

    setGuestConstruct({
      searched: filterGuest.first,
      guests: [filterGuest, ...guestGroup],
    });
  }, [filterGuest]);

  const unfortunatly = () => (
    <div className="mx-auto max-w-5xl py-2">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">

        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            To get started you will
          </h2>
          <p className="mt-6 text-lg/8 text-pretty text-gray-300">
            need to create an account
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <Button onClick={goToAuth}>
              Register
            </Button>
          </div>
        </div>

      </div>
    </div>
  )

  const goToAuth = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    router.push("/auth");
  }

  return (
    <div 
      className="relative w-full mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <GuestSearch guests={guests} />
      {userCode && !user ? unfortunatly() : <Response guests={guestConstruct} />}
    </div>
  )
}
