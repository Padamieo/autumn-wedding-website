'use client'

import { Popover, PopoverPanel } from '@headlessui/react'
import { FC, useEffect, useState } from 'react';
import { GuestDataVariable, useSearchContext } from '@/context/SearchContext';
import { useTranslations } from 'next-intl';
import { ExpectedResponses, GuestData, MinimalGuestData } from '@/types';
import { useNotificationContext } from '@/context/NotificationContext';
import classNames from 'classnames';
import { Mail, Moon, Sun, Close } from '../icons';

export interface Props {
  filterGuests: GuestDataVariable;
}

export const GuestList: FC<Props> = ({ filterGuests }) => {
  const t = useTranslations();
  const { setUserCode } = useSearchContext();
  const { createNotification } = useNotificationContext();
  const [open, setOpen] = useState<boolean>(false);

  const handle = (guest: MinimalGuestData | GuestData) => {
    guest.replied ? minorIssue(guest.code) : doThing(guest.code);
  }

  const doThing = (code: any) => {
    setUserCode(code);
    setOpen(false);
  };

  const minorIssue = (code: string) => {
    createNotification({
      id: code,
      type: 'default',
      message: t('notifications.user.submitted'),
    });
  };

  useEffect(() => {
    setOpen(filterGuests.length !== 0)
  }, [filterGuests]);

  const responseIcon = (response?: ExpectedResponses | "") => {
    switch (response) {
      case "weekend":
        return <Moon className="size-7 flex-none text-winter-lighter" />;
      case "day":
        return <Sun className="size-7 flex-none text-winter-lighter" />;
      case "not":
        return <Close className="size-7 flex-none text-winter-lighter" />;
      default:
        return <Mail className="size-7 flex-none text-winter-lighter"/>;
    }
  };

  return (
    <Popover className="relative">
      <PopoverPanel
        static={open}
        className={classNames(
          "absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 bg-transparent",
          "px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out",
          "data-leave:duration-150 data-leave:ease-in"
        )}
      >
        <div
          className={classNames(
            "w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-winter-green",
            "text-sm/6 outline-1 -outline-offset-1 outline-white/10"
          )}
        >
          <div className="p-4">
            {filterGuests && filterGuests.map((guest: MinimalGuestData | GuestData) => (
              <div key={guest.id} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-white/10" onClick={() => handle(guest)}>
                <div className={classNames(
                  "mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-100"
                )}>
                  {responseIcon(guest.replied)}
                </div>
                <div>
                  <span className="font-semibold text-white">
                    {guest.first} {guest.surname}
                    <span className="absolute inset-0" />
                  </span>
                  <p className="mt-1 text-gray-400">{guest.replied ? t("guest.results.responded") : t("guest.results.unresponded")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
};

export default GuestList;