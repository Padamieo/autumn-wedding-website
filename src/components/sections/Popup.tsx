import { useGiftContext } from '@/context/GiftContext';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useState } from 'react'

export default function MyModal() {
  const t = useTranslations('gift.popup');
  const { showModal, closeModal, data } = useGiftContext();

  const sections = [
    {
      intro: t('euros.intro'),
      copy: [
        {
          label: t("euros.accountName"),
          value: data.euros.accountName,
        },
        {
          label: t("euros.iban"),
          value:  data.euros.iban,
        }
      ]
    },
    {
      intro: t('pounds.intro'),
      copy: [
        {
          label: t("pounds.accountName"),
          value:  data.pounds.accountName,
        },
        {
          label: t("pounds.sortCode"),
          value: data.pounds.sortCode,
        },
        {
          label: t("pounds.accountNumber"),
          value: data.pounds.accountNumber,
        }
      ]
    }
  ];

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                    {t("title")}
                </Dialog.Title>
                  {sections.map((section, i) => (
                    <div key={`account-currency-${i}`} className="mt-4">
                      <p className="text-sm text-gray-500">
                        {section.intro}
                      </p>
                      {section.copy.map((copy, index) => (
                        <div key={`account-detail-${index}`} className={classNames(
                            "grid grid-cols-8 grid-flow-row gap-x-2 w-full mt-2",
                            // "max-w-[23rem]"
                          )}
                        >
                          <label
                          htmlFor="npm-install"
                          className="block text-gray-700 text-sm font-bold col-span-6 mb-1"
                          >{copy.label}</label>
                          <input
                            id="npm-install"
                            type="text"
                            // className="col-span-6 bg-neutral-secondary-medium border border-default-medium text-body text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            className={classNames(
                              "col-span-6 shadow appearance-none border rounded w-full py-2 px-3",
                              "text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            )}
                            value={copy.value}
                            disabled readOnly
                          />
                          <button
                            data-copy-to-clipboard-target="npm-install" 
                            // className="col-span-2 col-span-2 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm py-2.5 focus:outline-none sm:w-auto"
                            className={classNames(
                              "inline-flex justify-center rounded-md border border-transparent col-span-2",
                              "bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            )}
                          >
                              <span id="default-message">{t("copy")}</span>
                              <span id="success-message" className="hidden">
                                  <div className="inline-flex items-center">
                                      <svg
                                        className="w-3 h-3 me-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 11.917 9.724 16.5 19 7.5"
                                        />
                                      </svg>
                                      {t("copied")}
                                  </div>
                              </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    {t("close")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
