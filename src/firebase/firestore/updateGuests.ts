import firebase_app from "../config";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Get the Firestore instance
const db = getFirestore(firebase_app);

const collection = process.env.FIREBASE_GUEST_COLLECTION;

// Function to add data to a Firestore collection
export default async function updateGuests(
  // collection: string,
  id: string,
  data: any
) {
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  if (!collection) {
    return { result, error: 'No FIREBASE_GUEST_COLLECTION setup' };
  }

  const docRef = doc(db, collection, id);

  // console.log('YYYYY', docs);

  try {
    // Retrieve the document using the document reference
    const a = await getDoc(docRef);
    const y = a && a?.data();
    // console.log(y);
    if (!y || y.user !== '') {
      return { result, error: 'user already update' };
    }
  } catch (e) {
    return { result, error: e };
  }

  try {
    // Set the document with the provided data in the specified collection and ID
    result = await setDoc(docRef, data, {
      merge: true, // Merge the new data with existing document data
    });
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
