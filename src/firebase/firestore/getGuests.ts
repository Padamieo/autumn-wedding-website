'use server'

import { GuestData, MinimalGuestData } from "@/types";
import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GuestDataVariable } from "@/context/SearchContext";
// import output from '../../../scripts/output.json';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
const path = process.env.FIREBASE_GUEST_COLLECTION;

// only need to supply this guests user and any with ==
const obscurity = (data: GuestData[], auth: boolean, uid?: string) =>
  data && data.map((guest) => {
    const { user, opt, paid, dietary, ...rest } = guest;
    return { 
      ...rest,
      user: auth && uid ? uid == user ? user : user?.includes('==') ? user : '' : '',
    };
  },
) as GuestDataVariable;

// Function to retrieve a all guest data from a Firestore collection
export default async function getGuests(uid?: string) {
  let result = null;
  let error = null;

  if (!path) {
    return { result, error: 'No FIREBASE_GUEST_COLLECTION setup' };
  }

  const guestsCollectionRef = collection(db, path);

  try {
    const response = await getDocs(guestsCollectionRef);

    if (response && response.docs) {
      const data = response?.docs.map((doc) => doc.data() as GuestData);
      result = obscurity(data, !!auth, uid)
    } else {
      result = response;
    }
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // const c = output as GuestData[];
  // result = obscurity(c, !!auth, uid);
  
  return { result, error };
}
