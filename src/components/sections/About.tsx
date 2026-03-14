'use client'

import Image from 'next/image'
import { useTranslations } from "next-intl";
import classNames from 'classnames';
import contentLink, { Chunks } from '../contentLink';
import { Shirt, Time, Location } from '../icons';

export default function About() {
  const t = useTranslations();

  const common = {
    strong: (chunks: Chunks) => <strong className="font-semibold text-gray-900">{chunks}</strong>,
  };

  const points = [{
    id: 'when',
    icon: <Time className="mt-1 size-5 flex-none text-winter-lighter" />,
    extra: common,
  }, {
    id: 'where',
    icon: <Location className="mt-1 size-5 flex-none text-winter-lighter" />,
    extra: {
      ...common,
      a1: (chunk: Chunks) => contentLink({
        chunk,
        href: '#directions',
        target: '_self'
      }),
    }
  }, {
    id: 'what',
    icon: <Shirt className="mt-1 size-5 flex-none text-winter-lighter" />,
    extra: common,
  }];

  return (
    <div id="details" className="relative isolate overflow-hidden bg-white px-6 py-16 sm:py-20 lg:py-24 lg:overflow-visible lg:px-0">
      <div className={classNames(
          "mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16",
          // "sm:gap-y-16",
          "lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10"
        )}
      >
        <div className={classNames(
          "lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
        )}>
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className={classNames(
                  // "allison",
                  "text-base/7 font-semibold text-winter-lighter"
                  // "text-base/7 font-semibold",
                  // "text-3xl",
                  // "text-winter-green",
                )}
              >
              {t('about.little')}
              </p>
              <h1
                className={classNames(
                  "mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl",
                  "text-gray-900",
                )}
              >
                {t('about.title')}
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
                {t('about.intro')}
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 pl-12 pt-12 pb-0 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className={classNames(
              "ring-1 bg-gray-900 ring-gray-400/10",
              "w-3xl rounded-xl shadow-xl max-w-none sm:w-220",
              "w-200 -translate-x-1/5 sm:translate-none",
            )}
            src="/us.webp"
            alt="a picture of Heather & Adam"
            width={1120}
            height={836}
          />
        </div>
        <div className={classNames(
          "lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
        )}
        >
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-600 lg:max-w-lg">
              <p>
                {t('about.content')}
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                {points.map(point => (
                  <li key={point.id} className="flex gap-x-3">
                    {point.icon}
                    <span>
                      {t.rich(`about.bullet.${point.id}`, point.extra)}
                    </span>
                  </li>
                ))}
              </ul>
              {/* <p className="mt-8">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
                adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No server? No problem.</h2>
              <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
                Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
                tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam
                turpis ipsum eu a sed convallis diam.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
