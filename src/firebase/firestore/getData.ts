'use server'

// import { getAuth } from "firebase/auth";
import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { GuestData } from "@/types";

// const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);
const path = process.env.FIREBASE_GUEST_COLLECTION;

const obscurity = (data: GuestData[]) =>
  data && data.map((guest) => {
    return { ...guest, user: '' };
}) as GuestData[];

// Function to retrieve a document from a Firestore collection
export default async function getData() {
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
      // TODO: admin security for this
      result = obscurity(data);
    } else {
      result = response;
    }
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
