

import { defaultData } from "@/context/GiftContext";
// import { getAuth } from "firebase/auth";
import firebase_app from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import getAccountPath from "./getAccountPath";

// const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

// Function to get pay details
export default async function getAccount(token: string, password: string) {
  let result = null;
  let error = null;

  const response = await getAccountPath(token, password);

  if (response.error || !response.result){
    return { ...response };
  }

  const guestsCollectionRef = collection(db, response.result);
  
  try {
    const response = await getDocs(guestsCollectionRef);

    if (response && response.docs) {
      result = response?.docs.reduce(
        (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
        {}
      ) || defaultData;
    }
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
