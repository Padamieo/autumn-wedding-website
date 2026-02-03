'use client'

import Image from 'next/image';
import { useTranslations } from "next-intl";
import classNames from 'classnames';
import { FC } from 'react';

export default function Header() {
  const t = useTranslations();

  return (
    <div className="relative grid min-h-screen items-center justify-content px-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden sm:-top-80"
      >
        {/* <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        /> */}

        <Image
          className={classNames(
            "relative left-[calc(50%-11rem)] aspect-191/336 w-144.5 -translate-x-1/2 rotate-45 opacity-60",
            "sm:left-[calc(50%-30rem)] sm:w-288.75",
          )}
          src="/trial_bottom.webp"
          alt="flowers"
          width={191}
          height={336}
          priority
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative px-3 py-1 text-sm/6 text-gray-600 hover:ring-gray-900/20">
            {t('header.top')}
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            {t('header.title')}
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {t('header.description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#guestList"
              className={classNames(
                "rounded-md bg-winter-green px-3.5 py-2.5",
                "text-sm font-semibold text-white shadow-xs",
                "hover:bg-indigo-500",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
              )}
            >
              {t('header.button.rsvp')}
            </a>
            <a href="#details" className="text-sm/6 font-semibold text-gray-900 flex items-center">
                {t('header.button.details')}
                <span aria-hidden="true">
                  <Chevron className="size-6" />
                </span>
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute overflow-hidden inset-x-0 top-[calc(75%-13rem)] -z-10 transform-gpu  sm:top-[calc(100%-30rem)]"
        //overflow-hidden
      >
        {/* <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        /> */}
        <Image
          className={classNames(
            "relative left-[calc(50%+3rem)] aspect-175/271 w-100 -translate-x-1/2 rotate-45 opacity-60",
            "sm:left-[calc(50%+36rem)] sm:w-180",
          )}
          src="/trial_top.webp"
          alt="flowers"
          width={175}
          height={271}
          priority
        />
      </div>
    </div>
  )
}

type Props = {
  className?: string
};

const Chevron: FC<Props> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
  </svg>
);