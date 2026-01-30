'use client'

import { useMemo } from "react";
import { GuestSearch, Response } from "..";
import { useSearchContext } from "@/context/SearchContext";
import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Encourage from "./Encourage";
import Confirmation from "./Confirmation";

export default function Rsvp() {
  const t = useTranslations();
  const { user } = useAuthContext() as { user: any };
  const { guestConstruct, userCode, submittedCode } = useSearchContext();

  const firstName = useMemo(
    () => (guestConstruct && (guestConstruct?.guests.filter((guest) => {
      return guest.code === guestConstruct.code;
    }).shift())?.first),
    [guestConstruct],
  );

  if (submittedCode) {
    return (
      <Confirmation firstName={firstName} construct={guestConstruct} />
    )
  }

  return (
    <div 
      className="relative w-full mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <GuestSearch />
      {userCode && !user ? <Encourage firstName={firstName} /> : <Response construct={guestConstruct} />}
    </div>
  )
}
