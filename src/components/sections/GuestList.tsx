'use client'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FC, useEffect, useRef, useState } from 'react';
import { GuestDataVariable, useSearchContext } from '@/context/SearchContext';
import { useTranslations } from 'next-intl';
import { GuestData, MinimalGuestData } from '@/types';
import MyModal from './Popup';

export interface Props {
  filterGuests: GuestDataVariable;
}

export const GuestList: FC<Props> = ({ filterGuests }) => {
  const t = useTranslations();
  const { setUserCode } = useSearchContext();
  // const buttonRef = useRef<HTMLButtonElement>(null) // useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState<boolean>(false);
  // const aRef = useRef(null)
  //  const buttonRef = useRef();

  const handle = (guest: MinimalGuestData | GuestData) => {
    guest.replied ? issue() : doThing(guest.code);
  }

  const doThing = (code: any) => {
    setUserCode(code);
    setOpen(false)
    // close();
    // console.log(close)
  };

  const issue = () => {
    console.log('we already have a response from')
  };

  useEffect(() => {
    setOpen(filterGuests.length !== 0)
  }, [filterGuests])

  return (
    <>
    <Popover className="relative">
      <PopoverPanel
        // ref={aRef}
        // ref={setPopoverElement}
        static={open}
        className="absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
         
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-winter-green text-sm/6 outline-1 -outline-offset-1 outline-white/10">
          <div className="p-4">
            {filterGuests && filterGuests.map((guest: any) => (
              <div key={guest.id} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-white/10" onClick={() => handle(guest)}>
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-100">
                  {guest.code}
                </div>
                <div>
                  <a href={guest.href} className="font-semibold text-white">
                    {guest.first} {guest.surname}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-400">{guest.replied ? t("guest.results.responded") : t("guest.results.unresponded")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </PopoverPanel>
    </Popover>
    <MyModal />
    </>
  )
}

export default GuestList;
