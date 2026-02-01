
import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
const collection = process.env.NEXT_PUBLIC_FIREBASE_GUEST_COLLECTION;

// Function to add data to a Firestore collection
export default async function updateGuest(
  id: string,
  data: any
) {
  let result = null;
  let error = null;

  if (!collection) {
    return { result, error: 'No NEXT_PUBLIC_FIREBASE_GUEST_COLLECTION setup' };
  }

  const docRef = doc(db, collection, id);

  // Prevent overwriting already submitted RSVP's
  try {
    const response = await getDoc(docRef);
    if (response) {
      const usersData = response.data();
      if (!usersData || usersData.user !== '') {
        return { result, error: 'USER already update' };
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
