'use server'

import { GuestData, MinimalGuestData } from "@/types";
import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import output from '../../../scripts/output.json';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
const path = process.env.NEXT_PUBLIC_FIREBASE_GUEST_COLLECTION;

const obscurity = (data: GuestData[], auth: boolean) =>
  data && auth ? data : data.map((guest) => {
    const { date, user, opt, paid, dietary, ...rest } = guest;
    return { ...rest, user: '' } as MinimalGuestData;
  },
);

// Function to retrieve a all guest data from a Firestore collection
export default async function getGuests() {
  let result = null;
  let error = null;

  if (!path) {
    return { result, error: 'No NEXT_PUBLIC_FIREBASE_GUEST_COLLECTION setup' };
  }

  const guestsCollectionRef = collection(db, path);

  try {
    const response = await getDocs(guestsCollectionRef);

    if (response && response.docs) {
      const data = response?.docs.map((doc) => doc.data() as GuestData);
      result = obscurity(data, !!auth)
    } else {
      result = response;
    }
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // const c = output as GuestData[];
  // result = obscurity(c, !!auth)
  
  return { result, error };
}
