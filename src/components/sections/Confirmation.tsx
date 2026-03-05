'use client'

import { FC, Fragment, useEffect } from 'react';
import { GuestConstruct } from '@/context/SearchContext';
import { useTranslations } from 'next-intl';
import { isGuestType } from './Admin';
import classNames from 'classnames';

export interface Props {
  construct?: GuestConstruct;
}

export const Confirmation: FC<Props> = ({ construct }) => {
  const t = useTranslations("guest.confirmation");

  useEffect(() => {
    // NOTE: probably need to only do this once
    const element = document.getElementById("rsvp");
    // console.log(element);
    element?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }, []);

  if (!construct) {
    return;
  }

  return (
    <div
      id="rsvp"
      className={classNames(
        "relative bg-white w-full mx-auto max-w-3xl my-6 mx-6 px-4 py-6",
        "sm:px-6 lg:px-8"
      )}
    >
      <h2 className={classNames(
        "allison text-5xl",
        "mb-5"
      )}>
        {t("main")}
      </h2>
      {construct.guests.map((guest, i) => {
        if (isGuestType(guest)) {
          const time = guest.date ? new Date(guest.date) : undefined;
          return (
            <Fragment key={i}>
              {!i && 
                <p key={`by-${guest.id}`}>
                  {t("title", { date: time?.toUTCString() || '?' })}
                </p>
              }
              <p key={guest.id}>
                {guest.replied && t(`${guest.replied}`, { name: guest.first || '' })}
              </p>
            </ Fragment>
          )
        }
      })}
    </div>
  )
}

export default Confirmation;
