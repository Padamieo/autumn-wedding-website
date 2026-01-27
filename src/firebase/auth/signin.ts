// 'use server'

import firebase_app from "../config";
import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  getAuth
} from "firebase/auth";
import actionCodeSettings from "./config";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Function to sign in with email and password
export async function signIn(email: string, password?: string) {
  let result = null, // Variable to store the sign-in result
    error = null; // Variable to store any error that occurs

  try {
    result = await sendSignInLinkToEmail(auth, email, actionCodeSettings); // Request email link
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the sign-in result and error (if any)
}

export async function completeSignIn(email: string, emailLink: string) {
  let result = null, // Variable to store the sign-in result
    error = null; // Variable to store any error that occurs

  try {
    result = await signInWithEmailLink(auth, email, emailLink ); // submit email link
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the completed-process result and error (if any)
}
