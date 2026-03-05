'use client'

import { GuestSearch, Response } from "..";
import { useSearchContext } from "@/context/SearchContext";
import { useAuthContext } from "@/context/AuthContext";
import Encourage from "./Encourage";
import Confirmation from "./Confirmation";
import classNames from "classnames";

export default function Rsvp() {
  const { user } = useAuthContext() as { user: any };
  const { guestConstruct, userCode, submittedCode, firstName } = useSearchContext();

  if (submittedCode) {
    return (<Confirmation construct={guestConstruct} />)
  }

  return (
    <div 
      className={classNames(
        "relative w-full mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8"
      )}
    >
      <GuestSearch />
      {userCode && !user ? <Encourage firstName={firstName} /> : <Response construct={guestConstruct} />}
    </div>
  )
}
