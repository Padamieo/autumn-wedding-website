'use client'

import { useAuthContext } from "@/context/AuthContext";
import { GuestConstruct, useSearchContext } from "@/context/SearchContext";
import updateGuest from "@/firebase/firestore/updateGuest";
import { GuestUpdatePayload } from "@/types";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import Button from "../Button";
import { useConfettiContext } from "@/context/ConfettiContext";
import classNames from "classnames";
import { useNotificationContext } from "@/context/NotificationContext";
import { commonFocus, commonOutline, defaultInputText } from "../Input";
import { RadioOption } from "../RadioOption";

export interface Props {
  construct?: GuestConstruct;
}

const Response: FC<Props> = ({ construct }) => {
  const { user } = useAuthContext() as { user: any };
  const t = useTranslations();
  const { clearUser, updateGuestsStore } = useSearchContext();
  const { createError } = useNotificationContext();
  const { setConfetti } = useConfettiContext();
  const [loading, setLoading] = useState(false);

  const rsvpResponse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);

      const output = construct?.guests.reduce((acc, guest, i) => ({ ...acc, [guest.code]: {
        dietary: formData.get(`dietary-${i}`),
        replied: formData.get(`attendance-${i}`),
        opt: formData.get(`optional-${i}`) ? true : false || false,
        user: construct.code === guest.code ? user?.uid : `==${construct.code}`,
        date: new Date().valueOf(),
      }}), {}) as GuestUpdatePayload;

      sendResponse(output);
    }
  };

  const sendResponse = async (updateData: GuestUpdatePayload | undefined) => {
    const token = await user.getIdToken();

    if (updateData) {
      try {
        for (const code in updateData) {
          const { error } = await updateGuest(token, code, updateData[code]);

          if (error) {
            console.log(error);
            createError();
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.log(e);
        createError();
        setLoading(false);
        return;
      }

      // NOTE: update local store rather than call database again
      updateGuestsStore(updateData);
      if (construct?.code && updateData[construct.code].replied !== 'not') {
        setConfetti(true)
      }
      setLoading(false);
    }
  }

  const child = (i: number) => ['yes', 'no'].map(opt => (
    <RadioOption
      key={opt}
      name={`attendance-${i}`}
      id={opt}
      label={t(`guest.form.input.attendance.${opt}`)}
    />
  ));

  const baseOptions = ['day', 'not'] ;
  const adult = (i: number, stay: number) => 
    (stay <= 0 ? ['weekend', ...baseOptions] : baseOptions).map(opt => (
    <RadioOption
      key={opt}
      name={`attendance-${i}`}
      id={opt}
      label={t(`guest.form.input.attendance.${opt}`)}
      description={t(`guest.form.input.attendance.${opt}-info`)}
    />
  ));

  if (!construct) {
    return <div className="py-8">{t("guest.form.unknown")}</div>
  }

  return (
    <form className="rounded-md border bg-white border-gray-300 pt-6" onSubmit={rsvpResponse}>
      <div className="px-6 border-b border-gray-200">
        
        <h2 className="text-base/7 font-semibold text-gray-900">
          {t("guest.form.title")}
        </h2>
        <p className="mt-1 text-sm/7 text-gray-600">
          {t("guest.form.intro")}
        </p>
          
        <div role="list" className="mt-6 divide-y">
          {construct.guests.map((guest, i) => (
            <div
              className="space-y-4 mb-6 px-3 py-3 rounded-md border text-gray-400 bg-gray-100 sm:px-6"
              key={guest.id}
            >
              
              <fieldset>
                <legend className="block text-sm/6 font-medium text-gray-900">
                  {`${i+1}. `}{t("guest.form.input.attendance.label", { name: guest.first })}
                </legend>
                <p className="mt-1 text-sm/6 text-gray-600">{t("guest.form.input.attendance.info", { name: guest.first })}</p>
                <div className="mt-4 space-y-4">
                  {guest.participation === 1 ? child(i) : adult(i, guest.stay)}
                </div>
              </fieldset>

              <fieldset>
                <label htmlFor={`dietary-${i}`} className="block text-sm/6 font-medium text-gray-900">
                   {t("guest.form.input.dietary.label")}
                </label>
                <div className="mt-2 pl-1 sm:pl-3">
                  <textarea
                    id={`dietary-${i}`}
                    name={`dietary-${i}`}
                    rows={2}
                    className={classNames(
                      "px-3 py-1.5",
                      defaultInputText,
                      commonOutline,
                      commonFocus,
                      "sm:text-sm/6"
                    )}
                    defaultValue={''}
                  />
                </div>
                <p className="mt-2 pl-3 text-sm/6 text-gray-600">{t("guest.form.input.dietary.info")}</p>
              </fieldset>

              {guest.participation <= 0 &&
                <fieldset>
                  <legend className="block text-sm/6 font-medium text-gray-900">
                    {t("guest.form.input.optional.section")}
                  </legend>
                  <div className="mt-4 space-y-6">
                    <div className="flex gap-3 pl-1 sm:pl-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-6 grid-cols-1">
                          <input
                            id={`optional-${i}`}
                            name={`optional-${i}`}
                            type="checkbox"
                            aria-describedby="comments-description"
                            className={classNames(
                              "col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300",
                              "bg-white checked:border-winter-green checked:bg-winter-green indeterminate:border-winter-lighter",
                              "indeterminate:bg-winter-lighter focus-visible:outline-2",
                              "focus-visible:outline-offset-2 focus-visible:outline-winter-lighter hover:bg-winter-lighter",
                              "disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100",
                              "forced-colors:appearance-auto",
                            )}
                          />
                          <CheckBox />
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor={`optional-${i}`} >
                          <p className="font-medium text-gray-900">
                            {t("guest.form.input.optional.label")}
                          </p>
                          <p className="text-gray-600">
                            {t("guest.form.input.optional.info")} 
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              }
            </div>
          ))}

          <div className="mb-6 space-y-10">
            <p className="text-sm/6 text-gray-600">
              {t("guest.form.disclamer")}
            </p>
          </div>
          
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6 px-6 py-6">
        <button
          type="button"
          disabled={loading}
          className="text-sm/6 font-semibold text-gray-900"
          onClick={() => clearUser()}
        >
          {t("guest.form.cancel")}
        </button>
        <Button
          type="submit"
          disabled={loading}
        >
          {t("guest.form.submit")}
        </Button>
      </div>
    </form>
  )
}

export default Response;

const CheckBox = () => (
  <svg
    fill="none"
    viewBox="0 0 14 14"
    className={classNames(
      "pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center",
      "stroke-white group-has-disabled:stroke-gray-950/25"
    )}
  >
    <path
      d="M3 8L6 11L11 3.5"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-0 group-has-checked:opacity-100"
    />
    <path
      d="M3 7H11"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-0 group-has-indeterminate:opacity-100"
    />
  </svg>
);
