import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import getGuestPath from "./getGuestPath";

const db = getFirestore(firebase_app);

// Function to add data to a Firestore collection
export default async function updateGuest(
  token: string,
  id: string,
  data: any
) {
  let result = null;
  let error = null;

  const collection = await getGuestPath(token);

  if (collection.error || !collection.result){
    return { ...collection };
  }

  const docRef = doc(db, collection.result, id);

  // Prevent overwriting already submitted RSVP's
  try {
    const response = await getDoc(docRef);
    if (response) {
      const usersData = response.data();
      if (!usersData || usersData.user !== '') {
        return { result, error: 'USER already updated' };
      }
    } else {
      return { result, error: response };
    }
  } catch (e) {
    return { result, error: e };
  }

  // only proceed if above is good
  try {
    result = await setDoc(docRef, data, {
      merge: true, // Merge the new data with existing document data
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
