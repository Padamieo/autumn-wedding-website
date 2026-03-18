'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Player from "./Player";
import classNames from "classnames";
import { common } from "../contentLink";

export default function Music() {
  const t = useTranslations('music.out');
  const { user } = useAuthContext() as { user: any };

  return (
    <div id="music" className="grid place-items-center bg-winter-green px-4 sm:px-6 py-16 sm:py-16 lg:px-8">
      {user ? <Player /> :
        <div className="text-center">
          <p className=" text-lg font-medium text-pretty text-white sm:text-xl/8">
            {t('description')}
          </p>
          <h1 className={classNames(
            "allison text-gray-900 text-white",
            "mt-4 text-6xl font-semibold text-balance sm:text-7xl",
            "grid justify-content align-items"
          )}
          >
            {t('title')}
          </h1>
          {/* <NoSound className="size-8" /> */}
          <div className="mt-6 text-base font-semibold text-gray-300">
            {t.rich('subtitle', {
              ...common,
            })}
          </div>
        </div>
      }
    </div>
  )
};