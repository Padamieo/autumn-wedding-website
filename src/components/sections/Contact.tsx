'use client'

import { useTranslations } from 'next-intl';
import Image from 'next/image'

export default function Contact() {
  const t = useTranslations('contact');

  const people = [
    {
      name: t('bride.name'),
      role: t('bride.role'),
      email: t('bride.email'),
      mobile: t('bride.tel'),
      imageUrl: "/heather.webp"
    },
    {
      name: t('groom.name'),
      role: t('groom.role'),
      email: t('groom.email'),
      mobile: t('groom.tel'),
      imageUrl: "/adam.webp"
    },
  ];
  
  return (
    <>
    
    <div id="contact" className="w-full bg-white py-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">{t('body')}</p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 break-all sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center max-md:flex-col gap-x-6">
                <Image
                  className="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5"
                  src={person.imageUrl}
                  alt="picture of"
                  width={150}
                  height={150}
                  priority
                />
                <div className="">
                  <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm/6 font-semibold text-gray-400">{person.email}</p>
                  <p className="text-sm/6 font-semibold text-gray-400">{person.mobile}</p>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="w-full mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative h-96 overflow-hidden rounded-xl border border-dashed border-gray-400 opacity-75">
        <svg fill="none" className="absolute inset-0 size-full stroke-gray-900/10">
          <defs>
            <pattern id="pattern-d09edaee-fc6a-4f25-aca5-bf9f5f77e14a" width="10" height="10" x="0" y="0" patternUnits="userSpaceOnUse">
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-d09edaee-fc6a-4f25-aca5-bf9f5f77e14a)" stroke="none"></rect>
        </svg>
      </div>
    </div>

    </>
  )
}
