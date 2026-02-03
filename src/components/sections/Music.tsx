'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Player from "./Player";
import { FC } from "react";
import classNames from "classnames";

export default function Music() {
  const t = useTranslations();
  const { user } = useAuthContext() as { user: any };

  return (
    <div id="music" className="grid place-items-center bg-winter-green px-6 py-24 sm:py-24 lg:px-8">
      {user ? <Player /> :
        <div className="text-center">
          <p className=" text-lg font-medium text-pretty text-white sm:text-xl/8">
            {t('music.out.description')}
          </p>
          <h1 className={classNames(
            "mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl",
            "grid justify-content align-items"
          )}
          >
            {t('music.out.title')}
          </h1>
          <NoSound className="size-8" />
          <p className="mt-6 text-base font-semibold text-gray-900">{t('music.out.subtitle')}</p>
        </div>
      }
    </div>
  )
}

type Props = {
  className?: string
}

const NoSound: FC<Props> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="currentColor" >
    <path d="m616-320-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104-104 104Zm-496-40v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z"/>
  </svg>
)
