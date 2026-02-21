'use client'

import classNames from "classnames";
import { useTranslations } from "next-intl";

export default function FoodAndDrink() {
  const t = useTranslations('food_drink');

  const tiers = [
  {
    // name: t('ftitle'),
    id: 'tier-hobby',
    href: '#',
    priceMonthly: t('ftitle'),
    description: "Chilled arrival",
    features: [ t('fcontent'),  t('fdrink')],
    featured: false,
  },
  {
    // name: t('dtitle'),
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: t('dtitle'),
    description: 'The main event',
    features: [ t('dcontent'), t('dchildren'),  t('ddrink')],
    featured: true,
  },
    {
    // name: t('btitle'),
    id: 'tier-hobby',
    href: '#',
    priceMonthly: t('btitle'),
    description: "Everything else",
    features: [ t('bcontent'),  t('extra'), t('bdrink')],
    featured: false,
  },
]

  return (   
    <div className="relative isolate bg-white px-6 py-16 sm:py-24 lg:px-8">

      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
          {t('title')}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-base/7 font-medium text-pretty text-gray-600">
        {t('content')}
      </p>

      <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-10 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-winter-green shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                  : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
            )}
          >
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-4xl font-semibold',
                )}
              >
                {tier.priceMonthly}
              </span>
            </p>
            {/* <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p> */}
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-6',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
