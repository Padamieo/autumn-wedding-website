import { useGiftContext } from '@/context/GiftContext';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useState } from 'react'

export default function MyModal() {
  const t = useTranslations('gift.popup');
  const { showPopup, closeModal } = useGiftContext();
  // let [isOpen, setIsOpen] = useState(false)

  // function closeModal() {
  //   setIsOpen(false)
  // }

  // function openModal() {
  //   setIsOpen(true)
  // }

  const sections = [
    {
      intro: t('euroIntro'),
      copy: [
        {
          label: t("accountName"),
          value: 'MR A NAME'
        },
        {
        label: t("iban"),
        value: 'NL0000000000'
      }]
    },
    {
      intro: t('poundIntro'),
      copy: [
        {
          label: t("accountName"),
          value: 'MR A NAME'
        },
        {
          label: t("sortCode"),
          value: '00-00-00'
        },
        {
          label: t("accountNumber"),
          value: '000000'
        }
      ]
    }
  ];

  return (
    <>
      <Transition appear show={showPopup} as={Fragment}>
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
                   {sections.map((section, index) => (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {section.intro}
                        </p>
                        {section.copy.map((copy, index) => (
                          <div className="grid grid-cols-8 gap-2 w-full max-w-[23rem]">
                            <label
                            htmlFor="npm-install"
                            className="block text-gray-700 text-sm font-bold mb-2"
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
                                "inline-flex justify-center rounded-md border border-transparent",
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
    </>
  )
}
