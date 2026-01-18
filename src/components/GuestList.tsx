'use client'
import { ChangeEvent, useEffect, useState } from 'react';

// // Initialize Firebase auth instance
// const auth = getAuth(firebase_app);

export default function GuestList() {
  // Set up state to track the authenticated user and loading status
  const [user, setUser] = useState<null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('init');
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 2) {
      console.log('start searching', event.target.value.length);
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

  // Provide the authentication context to child components
  return (
    <input
      type="text"
      placeholder={'Adam'}
      className="border py-2 px-3 rounded w-full max-lg:max-w-[800px] mb-1"
      // value={searchTerm}
      onChange={handleSearch}
      autoComplete="on"
      translate="no"
    />
  );
}
