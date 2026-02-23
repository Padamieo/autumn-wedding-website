'use client'

import classNames from "classnames";
import { useTranslations } from "next-intl";

export default function FoodAndDrink() {
  const t = useTranslations('food_drink');

  const common = {
    h: ( chunks: any ) => <span className="invisible">{chunks}</span>,
  };

  const sections = [
    {
      id: 'friday',
      title: t('friday.title'),
      paragraphs: [
        t('friday.body0'),
        t('friday.body1'),
        t.rich('friday.body2', common ),
      ],
      color: false,
    },
    {
      id: 'saturday',
      title: t('day.title'),
      paragraphs: [
        t('day.body0'),
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
    <div id="food" className="relative isolate bg-white px-6 py-16 sm:py-24 lg:px-8">

      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          {t('title')}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-base/7 font-medium text-pretty text-gray-600">
        {t('content')}
      </p>

      <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-10 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={classNames(
              section.color ? 'relative bg-winter-green shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              section.color
                ? ''
                : index === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <p className="flex items-baseline gap-x-2">
              <span
                className={classNames(
                  section.color ? 'text-white' : 'text-gray-900',
                  'text-4xl font-semibold',
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
                <li key={`paragraph-${paragraphIndex}`} className="flex gap-x-3">
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
