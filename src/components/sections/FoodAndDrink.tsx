'use client'

import Image from 'next/image';
import classNames from "classnames";
import { useTranslations } from "next-intl";
import contentLink, { common } from "../contentLink";

export default function FoodAndDrink() {
  const t = useTranslations('food_drink');

  const sections = [
    {
      id: 'friday',
      title: t('friday.title'),
      paragraphs: [
        t.rich('friday.body0', {
          ...common,
          a: (chunk) => contentLink({
            chunk,
            href: 'https://www.instagram.com/rascals.events.catering/',
            target: '_blank',
            dark: false,
          })}
        ),
        t('friday.body1'),
        t.rich('friday.body2', common ),
      ],
      color: false,
    },
    {
      id: 'saturday',
      title: t('day.title'),
      paragraphs: [
        t.rich('day.body0', {
          ...common,
          a: (chunk) => contentLink({
            chunk,
            href: 'https://homegurrown.co.uk/',
            target: '_blank',
            dark: true,
          })}
        ),
        t('day.body1'),
        t('day.body2')
      ],
      color: true,
    },
    {
      id: 'else',
      title: t('other.title'),
      paragraphs: [
        t('other.body0'),
        t('other.body1'),
        t('other.body2')
      ],
      color: false,
    },
  ]

  return (   
    <div
      id="food"
      className={classNames(
        "relative isolate bg-white px-6",
        // "py-12 sm:py-16 lg:py-24 lg:px-8",
        'overflow-hidden'
      )}
    >
      <div
        aria-hidden="true"
        className={classNames(
          // "test",
          "absolute inset-x-0 -z-10 transform-gpu",
        )}
      >
        <Image
          className={classNames(
            "relative aspect-1566/2895",
            "w-250 min-w-3xl -translate-x-1/2 left-[calc(50%-0rem)] -rotate-30",
            "sm:min-w-4xl sm:rotate-15 sm:left-[calc(50%-0rem)]",
            "lg:right-[calc(50%-5rem)] lg:rotate-60 lg:-translate-y-1/4",
          )}
          src="/Ivory_Leaves_Element.webp"
          alt="background ivory leaf drawing"
          width={1566}
          height={2895}
        />
      </div>
      <section
        className={classNames(
          "py-12 sm:py-16 lg:py-24 lg:px-8",
        )}
      >

        <div className="mx-auto max-w-4xl text-center">
          <p
            className={classNames(
              "mt-2 text-3xl text-balance text-gray-900 sm:text-5xl",
              "font-semibold tracking-tight",
              // "dancing text-5xl sm:text-6xl"
            )}
          >
            {t('title')}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base/7 font-medium text-pretty text-gray-600">
          {t('content')}
        </p>

        <div
          className={classNames(
            "mx-auto mt-8 grid max-w-lg grid-cols-1 items-center gap-y-6",
            "sm:mt-10 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3"
          )}
        >
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={classNames(
                section.color ? 'relative bg-winter-green shadow-xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                section.color
                  ? ''
                  : index === 0
                    ? ' rounded-t-xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-xl'
                    : 'sm:rounded-t-none lg:rounded-tr-xl lg:rounded-bl-none',
                'rounded-xl p-6 ring-1 ring-gray-900/10 sm:p-10',
              )}
            >
              <p className="flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    "allison",
                    'text-4xl',
                    section.color ? 'text-white' : 'text-gray-900',
                    section.color ? 'text-4xl sm:text-5xl' : '',
                    'font-semibold'
                  )}
                >
                  {section.title}
                </span>
              </p>
              <ul
                role="list"
                className={classNames(
                  section.color ? 'text-gray-300' : 'text-gray-600',
                  'mt-8 space-y-3 text-sm/6 sm:mt-6',
                )}
              >
                {section.paragraphs.map((entry, paragraphIndex) => (
                  <li
                    key={`paragraph-${paragraphIndex}`}
                    className="gap-x-3"
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
