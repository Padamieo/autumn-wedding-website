'use client'

import { useNotificationContext } from "@/context/NotificationContext";
import getData from "@/firebase/firestore/getData";
import { ExpectedResponses, responseOptions, GuestData, MinimalGuestData } from "@/types";
import { useEffect, useMemo, useState } from "react";
// import Button from "../Button";
// import addData from "@/firebase/firestore/addData";
// import classNames from "classnames";
// import { useAuthContext } from "@/context/AuthContext";

export type Stats = {
  awaiting: number;
  not: number;
  weekend: number;
  day: number;
};

export const isGuestType = (keyInput: object ): keyInput is GuestData => {
  return keyInput.hasOwnProperty('replied')
  // return ['dietary', 'opt', 'date', 'paid'].includes(keyInput);
}

export default function Admin() {
  const { createError } = useNotificationContext();
  const [guests, setGuests] = useState<MinimalGuestData[] | GuestData[]>([]);
  // const { user } = useAuthContext() as { user: any };

  const readResponses = (r: ExpectedResponses, acc: Stats) => {
    switch (r) {
      case responseOptions.not:
        return {...acc, not: acc.not + 1};
      case responseOptions.day:
        return {...acc, day: acc.day + 1};
      case responseOptions.weekend:
        return {...acc, weekend: acc.weekend + 1};
      default:
        return acc;
    }
  };

  const stats = useMemo(
    () => (guests && guests.reduce(
      (acc, guest) => !guest?.replied ? {...acc, awaiting: acc.awaiting + 1} : readResponses(guest.replied, acc),
    { awaiting: 0, not: 0, weekend: 0, day: 0 } as Stats
    )),
    [guests],
  );

  const getGuestsData = async () => {
    const { result, error } = await getData();

    if (error) {
      console.log(error);
      createError();
      return; 
    }

    result && Array.isArray(result) && setGuests(result);
  };

  const rowColors = (r: ExpectedResponses | "") => {
    switch (r) {
      case responseOptions.no:
      case responseOptions.not:
        return 'bg-red-50';
      case responseOptions.yes:
      case responseOptions.day:
      case responseOptions.weekend:
        return 'bg-green-50';
      default:
        return 'bg-gray-100';
    }
  };

  useEffect(() => {
    // get user data, be nice to optmize to reduce calls for data on every refresh
    getGuestsData();
  }, []);
  
  const rowColor = 'border border-gray-700 md:border-none block md:table-row';
  const cellStyles = 'p-2 md:border md:border-gray-200 block md:table-cell';

  // const updateData = async () => {
  //  const token = await user.getIdToken();
  //   for(const guest in guests) {
  //     try {
  //       const { error, result } = await addData(token, guests[guest].code, guests[guest]);
  //       if (error) {
  //         console.log('err', error);
  //         return;
  //       }
  //       console.log('result', result);
  //     } catch (e) {
  //       console.log(e);
  //       return;
  //     }
  //   }
  // }

  const statsPoints = [
    { name: 'Awaiting a response from', value: `${((stats.awaiting / guests.length) * 100).toFixed(1)}%` },
    { name: 'Are not attending ):', value: stats.not },
    { name: 'Guests are coming', value: stats.day + stats.weekend },
    // { name: 'More information', value: <Button onClick={updateData}>update</Button> },
  ];

  return (
    <div className="grid bg-white px-8 py-24">
      <div className="max-w-xl">
        <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">Overview</h2>
        <p className="mt-6 text-lg/8 text-gray-700">
          Awaiting a response from: {stats.awaiting} out of {guests.length} invites
        </p>
        <p className="mt-2 text-lg/8 text-gray-700">
          {stats.weekend} are coming for weekend, and {stats.day} are coming just for the day.
        </p>
      </div>
      <dl className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {statsPoints.map((stat) => (
          <div key={stat.name} className="flex flex-col-reverse gap-1">
            <dt className="text-base/7 text-gray-700">{stat.name}</dt>
            <dd className="text-4xl font-semibold tracking-tight text-black">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <table className="min-w-full border-collapse block md:table mt-8">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-200 md:border-none block md:table-row">
            {['Code', 'Name', 'Attending', 'Dietary', 'Opt-in', 'Date', 'Paid'].map(tableTitle => 
              <th className="p-2 text-left font-medium md:border md:border-gray-200 block md:table-cell">{tableTitle}</th>
            )}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {guests && guests.map((guest: MinimalGuestData | GuestData) => (
            <tr key={guest.code} className={`${rowColor} ${rowColors(guest.replied)}`}>
              <td className={cellStyles}>{guest.code}</td>
              <td className={cellStyles}>{`${guest.first} ${guest.surname}`}</td>
              <td className={cellStyles}>{guest.replied}</td>
              <td className={cellStyles}>{isGuestType(guest) && guest.dietary || '-'}</td>
              <td className={cellStyles}>{isGuestType(guest) && guest.opt ? 'Yes' : '-'}</td>
              <td className={cellStyles}>{isGuestType(guest) && guest.date !== '' ? new Date(guest.date).toUTCString() : '-'}</td>
              <td className={cellStyles}>{isGuestType(guest) && guest.paid ? 'Yes' : 'No' }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
