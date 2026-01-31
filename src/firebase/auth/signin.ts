
import firebase_app from "../config";
import {
  signInWithEmailAndPassword,
  getAuth
} from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// sign in with email and password for admin
export async function signIn(email: string, password: string) {
  let result = null, error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the sign-in result and error (if any)
}