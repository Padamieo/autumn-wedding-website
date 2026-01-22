'use client'

import { FormEvent } from "react";

export default function Rsvp() {

  // NOTE: show if gueslist returns data

  const guests = {
    searchedName: 'Jane',
    restricted: false,
    replied: true,
    guests: [
      { name: 'Jane', paid: false, participation: 0 },
      { name: 'Bill', paid: false, participation: 2 },
    ]
  };

  const rsvpResponse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event)

  };

  const radioOption = (
    name: string,
    id: string,
    label: string,
    description?: string,
    checked?: boolean,
  ) => {
    return (
      <div className="flex items-center gap-x-3">
        <input
          defaultChecked={checked}
          id={id}
          name={name}
          type="radio"
          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
        />
        <div className="text-sm/6">
          <label htmlFor={id} className="font-medium text-gray-900">
            {label}
          </label>
          {description && (
            <p id="weekend-attending-description" className="text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <form className="rounded-md border border-gray-900" onSubmit={rsvpResponse}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">RSVP</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            To help us plan our day, we would like to get a little bit of information from you, this will help us plan food, accomidation and costs.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">

            <div className="col-span-full">
              <label htmlFor="dietary" className="block text-sm/6 font-medium text-gray-900">
                Dietary requirements.
              </label>
              <div className="mt-1">
                <textarea
                  id="dietary"
                  name="dietary"
                  rows={2}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Please let us know of any dietry concerns we need to pass onto our caterors.</p>
            </div>

          </div>
          
          <div role="list" className="mt-6 divide-y divide-gray-900 rounded-md border border-gray-900">
          {guests.guests.map((guest, i) => (
            <div className="mt-2 space-y-10 mb-20" key={guest.name}>

              <fieldset>
                <legend className="text-sm/6 font-semibold text-gray-900">Attendance decision for {guest.name}</legend>
                <p className="mt-1 text-sm/6 text-gray-600">Lets us know if we can expect {guest.name}.</p>
                <div className="mt-4 space-y-6">
                  {radioOption(
                    `attendance-${i}`,
                    `attending-weekend-${i}`,
                    'I would like to attend, the weekend',
                    'Arrive friday, leave on sunday',
                    true,
                  )}
                  {radioOption(
                    `attendance-${i}`,
                    `attending-day-${i}`,
                    'I would like to attend, just the ceremony day',
                    'Arriving saturday leaveing same day, i dont require accomidation at the venue'
                  )}
                  {radioOption(
                    `attendance-${i}`,
                    `attending-not-${i}`,
                    'I am NOT attending.'
                  )}
                </div>
              </fieldset>

              {guest.participation <= 0 &&
                <fieldset>
                  <legend className="text-sm/2 font-semibold text-gray-900">Optional Involvement</legend>
                  <div className="mt-2 space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="comments"
                            name="comments"
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
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          I would like to participate in the childrens treasure hunt game
                        </label>
                        <p id="comments-description" className="text-gray-500">
                          Weddings can/are boring for children, so we've decided to put together a treasure hunt for them.<br/> You will be supplied candy and a new clue for when a child finds you.
                        </p>
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-winter-green px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
