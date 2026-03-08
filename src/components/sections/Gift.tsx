'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import Button from "../Button";
import { useGiftContext } from "@/context/GiftContext";
import { useState } from "react";
import Input from "../Input";

export default function Gift() {
  const t = useTranslations();
  const { user } = useAuthContext() as { user: any };
  const { openModal, setPassword } = useGiftContext();
  const [disabled, setDisabled] = useState(true);

  const submit = (value: string) => {
    setPassword(value);
    setDisabled(!value.length);
  };

  const inputCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    submit(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value;
      value && submit(value);
      openModal();
    }
  };

  return (
    <div id="gift" className="grid place-items-center bg-winter-green px-6 py-16 sm:py-16 lg:px-8">
      {user ? 
        <div className="text-center">
          <p className=" text-lg font-medium text-pretty text-white sm:text-xl/8">
            {t("gift.preTitle")}
          </p>
          <h1 className={classNames(
            "mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl",
            "grid justify-content align-items"
          )}
          >
            {t("gift.in.title")}
          </h1>
          <div className={classNames(
            "mt-2",
            "grid grid-flow-row grid-cols-3 gap-x-2 w-full"
            )}
          >
            <Input
             type="text"
              placeholder={t("gift.in.placeholder")}
              name="password"
              className={classNames(
                "col-span-2",
              )}
              onChange={inputCheck}
              translate="no"
              autoComplete="off"
              onKeyDown={handleKeyDown}
              required
            />
            <Button
              disabled={disabled}
              onClick={openModal}
              className={classNames(
                "bg-winter-lighter hover:bg-winter-lighter/75"
              )}
            >
              {t("gift.in.button")}
            </Button>
          </div>
          <p className="mt-4 text-base font-semibold text-gray-300">{t("gift.in.sub")}</p>
        </div>
      :
        <div className="text-center">
          <p className=" text-lg font-medium text-pretty text-white sm:text-xl/8">
            {t("gift.preTitle")}
          </p>
          <h1 className={classNames(
            "mt-4 text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl",
            "grid justify-content align-items"
          )}
          >
            {t("gift.out.title")}
          </h1>
          <p className="mt-4 text-base font-semibold text-gray-900">{t("gift.out.sub")}</p>
        </div>
      }
    </div>
  )
};
