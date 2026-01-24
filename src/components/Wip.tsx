'use client'

import { useTranslations } from "next-intl";
// import { useRouter } from 'next/navigation';

export default function Wip() {
  const t = useTranslations();
  // const router = useRouter();

  // const changeLanguage = (newLocale) => {
  //   document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  //   router.refresh();
  //   {/* <button onClick={() => changeLanguage('en')}>Switch to English</button>
  //   <button onClick={() => changeLanguage('nl')}>Switch to Dutch</button> */}
  // };
  
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">{t('wip.top')}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            {t('wip.title')}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {t('wip.description')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
          </div>
        </div>
      </main>
    </>
  )
}
