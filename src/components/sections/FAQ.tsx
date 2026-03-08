'use client'

import { useTranslations } from "next-intl";
import contentLink from "../contentLink";

export default function FAQ() {
  const t = useTranslations();
  const linkKeys = {
    'location': '#directions',
    'food': '#food',
    'gift': '#gift',
    'accomodation': '#gift',
  } as { [key: string]: string };

  const faqs = [
    'deadline',
    'plan',
    'location',
    'dress',
    'weather',
    'plusOne',
    'food',
    'gift',
    'accomodation',
    'environment'
  ].map(entry => {
    return {
      question: t(`faq.${entry}.question`),
      answer: t.rich(`faq.${entry}.answer`, {
        a: (chunk) => contentLink({
          chunk,
          href: linkKeys[entry] || ''
        })}
      )
    }
  });

  return (
    <div id="faq" className="px-8 py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto">
      <div className="px-4 sm:px-0">
        <h2 className="text-base/7 font-semibold text-gray-900">{t('faq.intro.title')}</h2>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-600">{t('faq.intro.subtext')}</p>
      </div>
      <div className="mt-6 border-t border-gray-300">
        <dl className="divide-y divide-gray-300">
          {faqs.map((item, i) => (
            <div key={`faq-${i}`} id={`faq-${i}`} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
