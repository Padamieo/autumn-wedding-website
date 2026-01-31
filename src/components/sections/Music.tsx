'use client'

import { useTranslations } from "next-intl";

export default function Music() {
  const t = useTranslations();

  return (
    <div id="music" className="grid place-items-center bg-winter-green px-6 py-24 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-white">{t('wip.top')}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          MUSIC
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
          {t('wip.description')}
        </p>
      </div>
    </div>
  )
}
