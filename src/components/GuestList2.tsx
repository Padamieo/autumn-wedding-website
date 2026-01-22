'use client'
import { Popover, PopoverPanel } from '@headlessui/react'
import { FC } from 'react';

export interface Props {
  guests: any[];
}

export const GuestList2: FC<Props> = ({ guests }) => {

  return (
    <Popover className="relative">
    

      <PopoverPanel
        
        static
        className="absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-gray-300 text-sm/6 outline-1 -outline-offset-1 outline-white/10">
          <div className="p-4">
            
            {guests.map((item: any) => (
              <div key={item.id} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-white/50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-100">
                  asdas
                </div>
                <div>
                  <a href={item.href} className="font-semibold text-white">
                    {item.firstName} {item.surname}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-400">{item.replied ? 'responded' : 'awaiting response'}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="grid grid-cols-2 divide-x divide-white/10 bg-gray-700/50">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-gray-700/50"
              >
                bb
                {item.name}
              </a>
            ))}
          </div> */}
        </div>
      </PopoverPanel>

    </Popover>
  )
}
