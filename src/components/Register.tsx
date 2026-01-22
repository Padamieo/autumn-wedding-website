'use client'

import { FormEvent } from "react";

export default function Register() {

  const rsvpResponse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event)
  };

  const name = 'name';

  return (
    <form className="rounded-md border border-gray-900" onSubmit={rsvpResponse}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="relative block mt-1">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  data-slot="icon"
                  aria-hidden="true"
                  className="pointer-events-none w-6 h-4 absolute top-1/3 transform -translate-y-1/4 left-1"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={`${name}@email.co.uk`}
                  // className="form-input border border-gray-900 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none"
                  className="block w-full rounded-md bg-white px-10 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

          </div>

          <div className="">
            <button
              type="submit"
              className="rounded-md bg-winter-green px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>          
        </div>
      </div>
    </form>
  )
}
