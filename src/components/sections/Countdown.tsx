'use client'

// import { useAuthContext } from "@/context/AuthContext";
// import { useTranslations } from "next-intl";

// import classNames from "classnames";
// import { useEffect, useState } from "react";

export default function Countdown() {
  // const t = useTranslations('countdown');
  // const { user } = useAuthContext() as { user: any };


  return (
    <div id="countdown" className="grid place-items-center bg-winter-green px-6 py-16 sm:py-16 lg:px-8">
      <span>136</span><span>days until</span>
    </div>
  )
};