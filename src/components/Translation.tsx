'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import classNames from 'classnames';
import { FC } from 'react';
import Button from './Button';

const languages = [
  { lang: 'en', label: 'English'},
  { lang: 'nl', label: 'Dutch'},
  { lang: 'ca', label: 'Catalan'},
]

export default function Translation() {

  return (
    <Menu as="div" className="relative inline-block">
      {/* <Button >English</Button> */}
      <MenuButton
        className={classNames(
          "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 items-center",
          // "text-sm shadow-xs ",
          "font-semibold text-gray-900 inset-ring-1 inset-ring-gray-300 hover:bg-gray-100"
        )}
      >
        English
        <ChevronDown className="size-5" />
      </MenuButton>

      <MenuItems
        transition
        className={classNames(
          "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md",
          "bg-white shadow-lg outline-1 outline-black/5 transition",
          "data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100",
          "data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        )}
      >
        <div className="py-1">
          {languages.map((lang, i) => (
            <MenuItem key={i}>
              <a
                href="#"
                className={classNames(
                  "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100",
                  "data-focus:text-gray-900 data-focus:outline-hidden"
                )}
              >
                {lang.label}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
};

type Props = {
  className?: string
};

const ChevronDown: FC<Props> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
  </svg>
);

