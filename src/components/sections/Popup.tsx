import { useGiftContext } from '@/context/GiftContext';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react'
import Button from '../Button';
import Input from '../Input';
import { Tick } from '../icons';

type CopiedState = { [id:string]: boolean };

export default function MyModal() {
  const t = useTranslations('gift.popup');
  const { showModal, closeModal, data } = useGiftContext();
  // TODO: might be nice to not repeate below
  const base = ["euros.accountName", "euros.iban", "pounds.accountName", "pounds.sortCode", "pounds.accountNumber"];
  const update = base.reduce(
    (acc, n) => n ? {...acc, n: false} : acc, {} as CopiedState
  );
  const [copied, setCopied] = useState(update);
  const copyToClipboard = (copy: string, key: string) => {
    // TODO: could add a timeout reset
    setCopied({...update, [key]: true});
    navigator.clipboard.writeText(copy);
  };

  const sections = [
    {
      intro: t('euros.intro'),
      copy: [
        {
          key: "euros.accountName",
          label: t("euros.accountName"),
          value: data.euros.accountName,
        },
        {
          key: "euros.iban",
          label: t("euros.iban"),
          value:  data.euros.iban,
        }
      ]
    },
    {
      intro: t('pounds.intro'),
      copy: [
        {
          key: "pounds.accountName",
          label: t("pounds.accountName"),
          value:  data.pounds.accountName,
        },
        {
          key: "pounds.sortCode",
          label: t("pounds.sortCode"),
          value: data.pounds.sortCode,
        },
        {
          key: "pounds.accountNumber",
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
                <p className="text-sm text-gray-600 mt-4">
                  {t("reason")}
                </p>

                  {sections.map((section, i) => (
                    <div key={`account-currency-${i}`} className="mt-4">
                      <p className="text-sm text-gray-600">
                        {section.intro}
                      </p>
                      {section.copy.map((copy) => (
                        <div key={`account-detail-${copy.key}`} className={classNames(
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
                            onClick={() => copyToClipboard(copy.value, copy.key)}
                          >
                            <span
                              id="default-message"
                              className={classNames(
                                copied[copy.key] && "hidden",
                              )}
                            >{t("copy")}</span>
                            <span
                              id="success-message"
                              className={classNames(
                                !copied[copy.key] && "hidden",
                              )}
                            >
                              <div className="inline-flex items-center">
                                <Tick className="w-3 h-3 me-1 size-8"/>
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
                      "bg-autumn-pink hover:bg-autumn-pink/75"
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
