'use client'

import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
// import addData from '@/firebase/firestore/addData';
// import getDocument from '@/firebase/firestore/getData';
import { GuestList } from './GuestList';
import { GuestData } from '@/types';
import { useTranslations } from 'next-intl';

// // Initialize Firebase auth instance
// const auth = getAuth(firebase_app);

export interface Props {
  guests: GuestData[];
}

export const GuestSearch: FC<Props> = ({ guests }) => {
   const t = useTranslations();
  // Set up state to track the authenticated user and loading status
  // const [guests, setGuests] = useState<any[]>([]);
  const [search, setSearch] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const filterGuests = useMemo(
    () => (guests && guests.filter((person) => {
      return search && person.participation !== 1 && (
        person.first.toLowerCase().includes(search.toLowerCase())
        || person.surname.toLowerCase().includes(search.toLowerCase())
        || person.alt.toLowerCase().includes(search.toLowerCase())
      )
    })),
    [search],
  );

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 2) {
      setSearch(event.target.value);
    }
    // setSearchTerm(e.target.value);

    // If the search term changes, reset the selected guest and related states
    // if (selectedGuest) {
    //   setSelectedGuest(null);
    //   setGuestsToRsvp([]);
    //   setSubmitted(false);
    //   setErrorMessage("");
    //   setSpecialRequests("");
    // }
  };

  const b = async () => {
    console.log('ADD');
    // const a = await addData('asasdasdasd', '', {
    //   id: 4,
    //   code: 'LUV',
    //   firstName: 'Heather',
    //   surname: 'Heather',
    //   relationships: [],
    //   replied: '',
    //   paid: false
    // });
    // const a = await getDocument('asasdasdasd', '') 
    // console.log('ADD:', a);

    // const y = a.result?.data()
    // console.log('DDD,', y);
   

    // const y = a.result?.docs.map((doc) => doc.data());
    // console.log('DDD,', y);
  }

  useEffect(() => {
    // console.log('init');
    // NOTE: get user data
    // setGuests([]);
    setLoading(false);
    // setGuests(output);
  }, []);


  // Provide the authentication context to child components
  return (
    <div className="block">
      <label htmlFor="dietary" className="block text-sm/6 font-medium text-gray-900">
        {t("guest.search.label")}
      </label>
      <input
        id="guestList"
        type="text"
        placeholder={t("guest.search.placeholder")}
        disabled={loading}
        className="block w-full rounded-md bg-white py-2 px-3 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 w-full mb-2"
        // value={searchTerm}
        onChange={handleSearch}
        autoComplete="on"
        translate="no"
      />
      <GuestList filterGuests={filterGuests} />
    </div>
  );
}

export default GuestSearch;
