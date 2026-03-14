'use client'

import classNames from 'classnames';
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
    <div id="contact" className="w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 sm:gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 
            className={classNames(
              "text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl"
            )}
          >
            {t('title')}
          </h2>
          <p 
            className={classNames(
              "mt-6 text-gray-600",
              "text-base/7"
            )}
          >
            {t('body')}
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-8 sm:gap-y-12 break-all sm:grid-cols-2 sm:gap-y-16 xl:col-span-2 items-center"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center max-md:flex-col gap-x-6">
                <Image
                  className="size-28 sm:size-24 rounded-full outline-1 -outline-offset-1 outline-black/5"
                  src={person.imageUrl}
                  alt="picture of"
                  width={150}
                  height={150}
                  priority
                />
                <div className="text-center sm:text-left">
                  <p
                    className={classNames(
                      "mt-4 sm:mt-0",
                      "allison text-3xl/6 font-semibold",
                      "text-winter-green"
                    )}
                  >
                    {person.role}
                  </p>
                  <h3 className="mt-3 text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm/6 text-gray-600">{person.email}</p>
                  <p className="text-sm/6 text-gray-600">{person.mobile}</p>
                  
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="w-full mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative grid items-center text-center h-24 text-sm/6 text-gray-600">
        <span>
          {t.rich('end', {
            mobile: (chunk) => <p className="sm:inline">{chunk}</p>
          })}
        </span>
      </div>
    </div>

    </>
  )
}
