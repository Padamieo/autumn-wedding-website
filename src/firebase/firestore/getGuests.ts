'use server'

import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// import {
//   getAuth
// } from "firebase/auth";

// Get the authentication instance using the Firebase app
// const auth = getAuth(firebase_app);

// Get the Firestore instance
const db = getFirestore(firebase_app);

const path = process.env.FIREBASE_GUEST_COLLECTION;

// Function to retrieve a document from a Firestore collection
export default async function getGuests() {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  if (!path) {
    return { result, error: 'No FIREBASE_GUEST_COLLECTION setup' };
  }

  // Create a document reference using the provided collection and ID
  const guestsCollectionRef = collection(db, path);

  try {
    // Retrieve the document using the document reference
    result = await getDocs(guestsCollectionRef);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
