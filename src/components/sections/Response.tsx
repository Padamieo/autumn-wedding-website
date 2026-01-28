'use client'

import { useAuthContext } from "@/context/AuthContext";
import { GuestData } from "@/types";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type GuestConstruct = {
  code: string;
  guests: GuestData[],
}

export interface Props {
  guests?: GuestConstruct;
}

const Response: FC<Props> = ({ guests }) => {
  const { user } = useAuthContext() as { user: any };
  const t = useTranslations();

  const rsvpResponse = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
        const formData = new FormData(event.target);
        console.log(event, formData);

        const a = guests?.guests.map((x:GuestData, i) => ({
          ...x,
          dietary: formData.get(`dietary-${i}`),
          replied: formData.get(`attendance-${i}`),
          opt: formData.get(`optional-${i}`) || undefined,
          user: guests.code === x.code ? user.uid || 'BBB' : undefined,
        } as GuestData))
        
        console.log('submit', a);
    }
  };

  const radioOption = (
    name: string,
    id: string,
    label: string,
    description?: string,
    checked?: boolean,
  ) => {
    return (
      <label className="flex items-center gap-x-3 hover:bg-winter-green px-3" htmlFor={`${name}-${id}`} >
        <input
          required
          // defaultChecked={checked}
          id={`${name}-${id}`}
          name={name}
          type="radio"
          value={id}
          className="relative size-6 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
        />
        <div className="text-sm/6" >
          <p className="font-medium text-gray-900">
            {label}
          </p>
          {description && (
            <p id={`${id}-attending-description`} className="text-gray-500">
              {description}
            </p>
          )}
        </div>
      </label>
    );
  };


  const child = (i: number) => (
    <>
      {radioOption(
        `attendance-${i}`,
        `confirm`,
        t("guest.form.input.attendance.yes"),
        undefined,
        true,
      )}
      {radioOption(
        `attendance-${i}`,
        `not`,
        t("guest.form.input.attendance.no"),
      )}
    </>
  );

  const adult = (i:number, stay: number) => (
    <>
      {stay <= 0 && radioOption(
        `attendance-${i}`,
        `weekend`,
        t("guest.form.input.attendance.weekend"),
        t("guest.form.input.attendance.weekend-info"),
        true,
      )}
      {radioOption(
        `attendance-${i}`,
        `day`,
        t("guest.form.input.attendance.day"),
        t("guest.form.input.attendance.day-info"),
      )}
      {radioOption(
        `attendance-${i}`,
        `not`,
        t("guest.form.input.attendance.not"),
      )}
    </>
  );

  if (!guests) {
    return <p>{t("guest.form.unknown")}</p>
  }



  return (
    <form className="rounded-md border border-gray-900 pt-5 " onSubmit={rsvpResponse}>
      <div className="space-y-12">
        <div className="px-5 border-b border-gray-900/10 pb-12">
        
          <h2 className="text-base/7 font-semibold text-gray-900">{t("guest.form.title")}</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            {t("guest.form.intro")}
          </p>
          
          <div role="list" className="mt-6 divide-y divide-gray-900 rounded-md border border-gray-900">
          {guests.guests.map((guest, i) => (
            <div className="mt-2 space-y-10 mb-20 rounded-md border" key={guest.id}>
              
              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">{t("guest.form.input.attendance.label")} {guest.first}</legend>
                <p className="mt-1 text-sm/6 text-gray-600">{t("guest.form.input.attendance.info")} {guest.first}.</p>
                <div className="mt-4 space-y-6">
                  {guest.participation === 1 ? child(i) : adult(i, guest.stay)}
                </div>
              </fieldset>

              <div className="col-span-full">
                <label htmlFor={`dietary-${i}`} className="block text-sm/6 font-medium text-gray-900">
                   {t("guest.form.input.dietary.label")}
                </label>
                <div className="mt-1">
                  <textarea
                    id={`dietary-${i}`}
                    name={`dietary-${i}`}
                    rows={2}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">{t("guest.form.input.dietary.info")}</p>
              </div>

              {guest.participation <= 0 &&
                <fieldset>
                  <legend className="text-sm/2 font-semibold text-gray-900">{t("guest.form.input.optional.section")}</legend>
                  <div className="mt-4 space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center px-3">
                        <div className="group grid size-6 grid-cols-1">
                          <input
                            id={`optional-${i}`}
                            name={`optional-${i}`}
                            type="checkbox"
                            aria-describedby="comments-description"
                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
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
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor={`optional-${i}`} >
                          <p className="font-medium text-gray-900">
                            {t("guest.form.input.optional.label")}
                          </p>
                          <p className="text-gray-500">
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
          </div>


         <div className="mt-10 space-y-10">
            <p className="mt-1 text-sm/6 text-gray-600">
              Any information we have already or you provide us will only be stored until the event, after which it will deleted.
            </p>
          </div>
          
        </div>
      </div>

      <div className="flex items-center justify-end gap-x-6 px-6 py-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          disabled={false}
          className="rounded-md bg-winter-green px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default Response;
