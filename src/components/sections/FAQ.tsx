'use client'

import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations();
  const faqs = [
    'deadline',
    'plan',
    'location',
    'dress',
    'weather',
    'plusOne',
    'food',
    'drink',
    'gift',
    'accomidation'
  ].map(entry => {
    return {
      question: t(`faq.${entry}.question`),
      answer: t(`faq.${entry}.answer`)
    }
  });

  return (
    <div id="faq" className="px-8 py-8 max-w-7xl mx-auto">
      <div className="px-4 sm:px-0">
        <h2 className="text-base/7 font-semibold text-gray-900">{t('faq.intro.title')}</h2>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">{t('faq.intro.subtext')}</p>
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
