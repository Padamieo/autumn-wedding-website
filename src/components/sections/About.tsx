'use client'

import Image from 'next/image'
import { useTranslations } from "next-intl";
import classNames from 'classnames';
import contentLink, { Chunks } from '../contentLink';

const Location = ({ className }: { className: string }) => (
  <svg
   className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>
    </svg>
)

const Time = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24" fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l-4 2"/>
  </svg>
);

const Shirt = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
  </svg>
);

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
    <div id="details" className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* <First /> */}
                {/* <Image
                  className={classNames(
                    "relative left-[calc(50%-20rem)] aspect-4775/4750 w-550 min-w-7xl -translate-x-1/2 rotate-195",
                    "sm:left-[calc(50%-0rem)]",
                  )}
                  src="/bouquet_33.png"
                  alt="pretty watercolor wreath of flowers"
                  width={4775}
                  height={4750}
                  priority
                /> */}
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className={classNames(
                  "allison",
                  // "text-base/7 font-semibold",
                  "text-3xl",
                  "text-winter-green",
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
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
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
