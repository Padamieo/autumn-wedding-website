'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import Button from "../Button";

export default function Gift() {
  const t = useTranslations();
  const { user } = useAuthContext() as { user: any };

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
          <div className="mt-2">
            <input
              type="text"
              placeholder={t("gift.in.placeholder")}
              name="artist"
              className={classNames(
                "block w-full rounded-md  py-2 px-3 text-base bg-white text-gray-800",
                "outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400",
                "focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 w-full"
              )}
              onChange={() => {}}
              translate="no"
              required
            />
            <Button className="mt-2">{t("gift.in.button")}</Button>
          </div>
          <p className="mt-4 text-base font-semibold text-gray-900">{t("gift.in.sub")}</p>
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
