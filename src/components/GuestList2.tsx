'use client'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useEffect, useState } from 'react';

export default function Example(guests: any = []) {
  const [open, setOpen] = useState(false);
  // console.log('aaa', guests, guests.length < 0);

  useEffect(() =>{
    guests.length < 0 && guests.forEach((x:any) => {
      console.log(x);
    })
    setOpen(guests.length < 0);
  },[guests])

  return (
    <Popover className="relative">
    
        
      <PopoverPanel
        
        static
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 bg-transparent px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-gray-800 text-sm/6 outline-1 -outline-offset-1 outline-white/10">
          <div className="p-4">
            {guests.length < 0 && guests.map((item: any) => (
              <div key={item.id} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-white/5">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
                  aaa
                </div>
                <div>
                  <a href={item.href} className="font-semibold text-white">
                    {item.firstName} {item.surname}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-400">{item.surname}</p>
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
