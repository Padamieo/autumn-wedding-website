'use client'

import { FC, Fragment } from 'react';
import { GuestConstruct } from '@/context/SearchContext';
import { useTranslations } from 'next-intl';
import { isGuestType } from './Admin';

export interface Props {
  firstName?: string;
  construct?: GuestConstruct;
}

export const Confirmation: FC<Props> = ({ firstName, construct }) => {
  const t = useTranslations();
  if (!construct) {
    return 
  }
  return (
    <div 
      className="relative bg-white w-full mx-auto max-w-3xl my-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      {construct.guests.map((guest, i) => {
        if (isGuestType(guest)) {
          return (
            <Fragment key={i}>
              {!i && <p key={`by-${guest.id}`}>{t("guest.confirmation.title", { name: firstName || '', date: guest.date || '' })}</p>}
              <p key={guest.id}>{t(`guest.confirmation.${guest.replied}`, { name: guest.first || '' })}</p>
            </ Fragment>
          )
        }
      })}
    </div>
  )
}

export default Confirmation;
