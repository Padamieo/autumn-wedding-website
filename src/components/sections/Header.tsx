'use client'

import Image from 'next/image';
import { useTranslations } from "next-intl";
import classNames from 'classnames';
import { FC } from 'react';

export default function Header() {
  const t = useTranslations();


  return (
    <div className="relative grid min-h-screen items-center justify-content px-6 ">
      <div
        aria-hidden="true"
        className={classNames(
          "absolute inset-x-0 -z-10 transform-gpu",
          'overflow-hidden'
          // "-top-10 sm:-top-10"
        )}
      >
        <Image
          className={classNames(
            "relative left-[calc(50%-20rem)] aspect-4775/4750 w-550 min-w-7xl -translate-x-1/2 rotate-195",
            "sm:left-[calc(50%-0rem)]",
          )}
          src="/wreath.webp"
          alt="pretty watercolor wreath of flowers"
          width={4775}
          height={4750}
          priority
        />
      </div>
      <div className={classNames(
        "mx-auto max-w-2xl py-8 sm:py-48 lg:py-56",
        "bg-white/75 sm:bg-transparent"
      )}>
        <div className="mb-2 sm:mb-8 flex justify-center">
          <div className={classNames(
            "relative px-3 py-1 text-sm/6 text-center",
            "text-black sm:text-gray-900"
          )}
          >
            {t.rich('header.top', {
              mobile: (chunk) => <p className="sm:inline">{chunk}</p>
            })}
          </div>
        </div>
        <div className="text-center">
          <h1
            className={classNames(
              "text-6xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl",
              'dancing',
            )}
          >
            {t('header.title')}
          </h1>
          <p
            className={classNames(
              "mt-8 px-3 text-lg font-medium text-pretty sm:text-xl/8",
              "text-black sm:text-gray-900"
            )}
          >
            {t('header.description')}
          </p>
          <div
            className={classNames(
              "mt-10 flex items-center justify-center gap-x-4",
              "px-3"
            )}
          >
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