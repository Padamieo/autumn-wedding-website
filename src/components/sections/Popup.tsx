import { useGiftContext } from '@/context/GiftContext';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Fragment, useEffect, useState } from 'react'
import Button from '../Button';
import Input from '../Input';

export default function MyModal() {
  const t = useTranslations('gift.popup');
  const { showModal, closeModal, data } = useGiftContext();
  const [loading, setLoading] = useState(false);

  const copyToClipboard = (copy: string) => {
    navigator.clipboard.writeText(copy);
  };

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
              <Dialog.Panel className={classNames(
                  "w-full max-w-md transform overflow-hidden rounded-2xl bg-white",
                  "p-6 text-left align-middle shadow-xl transition-all"
                )}
              >
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
                            "grid grid-cols-8 grid-flow-row gap-x-2 w-full mt-2"
                          )}
                        >
                          <label
                            htmlFor="npm-install"
                            className="block text-gray-700 text-sm font-bold col-span-6 mb-1"
                          >
                            {copy.label}
                          </label>
                          <Input
                            type="text"
                            className={classNames(
                              "col-span-6 appearance-none",
                              "sm:text-sm/6",
                              "leading-tight"
                            )}
                            value={copy.value}
                            disabled
                            readOnly
                          />
                          <Button
                            data-copy-to-clipboard-target="npm-install" 
                            className={classNames(
                              "inline-flex justify-center border border-transparent col-span-2",
                            )}
                            onClick={() => copyToClipboard(copy.value)}
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
                          </Button>
                        </div>
                      ))}
                    </div>
                  ))}

                <div className="mt-4">
                  <Button
                    type="button"
                    className={classNames(
                      ""
                    )}
                    onClick={closeModal}
                  >
                    {t("close")}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
