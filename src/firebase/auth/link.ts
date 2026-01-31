
import firebase_app from "../config";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  getAuth
} from "firebase/auth";
import actionCodeSettings from "./config";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// sign in with email passwordless firebase email
export async function signIn(email: string) {
  let result = null, error = null;

  try {
    result = await sendSignInLinkToEmail(auth, email, actionCodeSettings); // Request email link
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the sign-in result and error (if any)
}

// completes sign in using link provided
export async function completeSignIn(email: string, emailLink: string) {
  let result = null, error = null;

  try {
    result = await signInWithEmailLink(auth, email, emailLink ); // submits email link
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the completed-process result and error (if any)
}
