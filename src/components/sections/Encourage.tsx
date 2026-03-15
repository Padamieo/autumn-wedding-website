'use client'

import { Button } from "..";
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";
import { FC } from "react";
import classNames from "classnames";

export interface Props {
  firstName?: string;
}

const Encourage: FC<Props> = ({ firstName }) => {
  const t = useTranslations();
  const router = useRouter();

  const goToAuth = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    router.push("/auth");
  }

  return (
    <div className="mx-auto max-w-2xl py-2">
      <div
        className={classNames(
          "relative isolate overflow-hidden bg-white px-6 py-16",
          "shadow-md rounded-xs sm:rounded-xl sm:px-16 md:py-8 lg:flex lg:gap-x-20 lg:px-24"
        )}
      >
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-3 lg:text-left">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-black sm:text-2xl">
           {t("guest.process.title", { name: firstName || '' })}
          </h2>
          <p className="mt-6 text-base/7 text-pretty text-gray-700">
            {t("guest.process.body")}
          </p>
          <div className="flex items-center justify-center gap-x-6 lg:justify-start pt-4">
            <Button onClick={goToAuth}>
              {t("guest.process.button")}
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Encourage;
