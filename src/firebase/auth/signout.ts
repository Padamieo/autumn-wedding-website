import firebase_app from "../config";
import { signOut as firebaseSignOut, getAuth } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Function to sign up a user with email and password
export default async function signOut() {
  let result = null, // Variable to store the sign-up result
    error = null; // Variable to store any error that occurs

  try {
    result = await firebaseSignOut(auth); // signs out a currently signed in user
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-up
  }

  return { result, error }; // Return the sign-up result and error (if any)
}
