'use client'

import { FC, Fragment, useEffect, useMemo } from 'react';
import { GuestConstruct } from '@/context/SearchContext';
import { useTranslations } from 'next-intl';
import { isGuestType } from './Admin';
import classNames from 'classnames';
import { responseOptions } from '@/types';

export const costs = { pounds: 70, euros: 80 };

export interface Props {
  construct?: GuestConstruct;
};

export const Confirmation: FC<Props> = ({ construct }) => {
  const t = useTranslations("guest.confirmation");

  const stayingWeekend = useMemo(() => construct && construct.guests.map((g) => g.replied === responseOptions.weekend), [construct?.guests]);

  useEffect(() => {
    // NOTE: probably need to only do this once
    const element = document.getElementById("rsvp");
    // console.log(element);
    element?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }, []);

  if (!construct) {
    return;
  }

  const multiplyBy = stayingWeekend && stayingWeekend.includes(true) && stayingWeekend.reduce((acc, weekendFlag) => weekendFlag === true ? acc+1: acc, 0 ) || 0;

  return (
    <div 
      className={classNames(
        "relative w-full mx-auto px-4 sm:px-6 pb-4",
      )}
    >
      <div
        id="rsvp"
        className={classNames(
          "relative bg-white max-w-3xl rounded-xs",
          "w-full mx-auto",
          "mx-6 px-4 py-6",
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
                  <p key={`by-${guest.id}`} className='pb-2'>
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
        {stayingWeekend && stayingWeekend.includes(true) &&
          <p className='pt-2'>
            {t("payment", {
              euros: `${multiplyBy * costs.euros}`,
              pounds: `${multiplyBy * costs.pounds}`,
            })}
          </p>
        }
          <p className='pt-2'>
            {t("sentiment")}
          </p>
      </div>
    </div>
  );
};

export default Confirmation;
