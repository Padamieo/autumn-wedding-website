'use client'

import Image from 'next/image'
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { contentLink, Chunks } from '../contentLink';


export default function Directions() {
  const t = useTranslations('directions');

  const common = {
    b: ( chunks: Chunks ) => <b>{chunks}</b>,
    i: ( chunks: Chunks ) => <i>{chunks}</i>,
  };

  const methods = [
    {
      id: 'driving',
      class: 'lg:row-span-2',
      title: t(`driving.title`),
      paragraphs: [
        t('driving.body0'),
        t.rich(
          'driving.body1',
          { ...common,
            a1: (chunk) => contentLink({
              chunk,
              href: 'https://www.boreplace.org/visit/visitor-information/parking-car-charging-and-directions',
              target: '_blank',
            }),
            a2: (chunk) => contentLink({
              chunk,
              href:'https://www.google.com/maps/place/Bore+Place/@51.3278655,-0.0914674,11z/data=!4m6!3m5!1s0x47df5044ac227787:0xa2f20928cb1ca0a0!8m2!3d51.2202648!4d0.154682!16s%2Fg%2F12xqrml_x?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D',
              target: '_blank',
            })
          }
        )
      ],
      image: (
        <Image
          className={classNames(
            "w-full max-lg:max-w-xs aspect-534/752"
          )}
          src="/example_google_car_map.webp"
          alt="mini map visual google bore place location"
          width={534}
          height={752}
        />
      ),
    },
    {
      id: 'flying',
      class: 'max-lg:row-start-1',
      title: t(`flying.title`),
      paragraphs: [
        t.rich('flying.body0',
          common
        ),
        t.rich('flying.body1', {
           a: (chunk) => contentLink({
            chunk,
            href: 'https://www.nationalrail.co.uk',
            target: '_blank',
          })
        })
      ],
      image: undefined,
    },
    {
      id: 'public',
      class: 'max-lg:row-start-3 lg:col-start-2 lg:row-start-2',
      title: t(`public.title`),
      paragraphs: [
        t('public.body0'),
        t('public.body1'),
        t.rich('public.body2', {
           a: (chunk) => contentLink({
            chunk,
            href: 'http://www.sevenoakstaxis.com/',
            target: '_blank',
          })
        })
      ],
      image: undefined,
    },
    {
      id: 'adventurous',
      class: 'lg:row-span-2',
      title: t(`adventurous.title`),
      paragraphs: [
        t.rich(
          'adventurous.body0',
          { ...common,
            a: (chunk) => contentLink({
              chunk,
              href: 'http://google.com/maps/place/Penshurst/@51.1943846,0.1624516,15z/data=!4m10!1m2!2m1!1s+Penshurst+trainstation!3m6!1s0x47df501777eb7323:0xa35de7a5b3636584!8m2!3d51.1971725!4d0.1732935!15sChZQZW5zaHVyc3QgdHJhaW5zdGF0aW9uWhgiFnBlbnNodXJzdCB0cmFpbnN0YXRpb26SAQ90cmFuc2l0X3N0YXRpb26aASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTmlNemN6TW1GUkVBReABAPoBBQiFAhBI!16zL20vMDV0bHBk?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D',
              target: '_blank',
            }),
          }
        ),
        t.rich(
          'adventurous.body1',
          { ...common }
        ),
        t.rich(
          'adventurous.body2',
          { ...common,
            a1: (chunk) => contentLink({
              chunk,
              href: 'https://www.gov.uk/government/publications/the-countryside-code',
              target: '_blank',
            }),
            a2: (chunk) => contentLink({
              chunk,
              href:'https://www.komoot.com/plan/tour/d01Aw01JwACpVk=FwgABNt2LWoA/@51.2081586,0.1720536,13.651z',
              target: '_blank',
            })
          }
        ),
      ],
      image: (
        <Image
          className={classNames(
            "w-full max-lg:max-w-xs aspect-488/527"
          )}
          src="/walk_map.webp"
          alt="mini map visual walk penshurst to bore place"
          width={488}
          height={527}
        />
      ),
    },

  ];

  return (
    <div id="directions" className="py-16 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">

        <h2 className="text-center text-base/7 font-semibold text-winter-lighter">{t(`preTitle`)}</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          {t('title')}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base/7 font-medium text-pretty text-gray-600">
          {t('subTitle')}
        </p>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {methods.map((method) => (
            <div key={method.id} className={classNames("relative", method.class)}>
              <div className="absolute inset-px rounded-lg bg-white" />

              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 pb-8 sm:px-10 sm:pt-10">
                  <p className="text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">{method.title}</p>
                   {method.paragraphs.map((feature, index) => (
                      <p key={index} className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                        {feature}
                      </p>
                    ))}
                </div>
                {method.image && (
                  <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-4 max-lg:pb-12 lg:pb-8">
                    {method.image}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
