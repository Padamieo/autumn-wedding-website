'use server'

import firebase_app from "../config";
import { 
// signInWithEmailAndPassword,
sendSignInLinkToEmail,
signInWithEmailLink,
getAuth
} from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

const url = process.env.FIREBASE_RETURN_URL;


// Function to sign in with email and password
export default async function signIn(email: string, password?: string) {
  let result = null, // Variable to store the sign-in result
    error = null; // Variable to store any error that occurs

  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000/auth?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    // iOS: {
    //   bundleId: 'nl.finallygettingmarried.ios'
    // },
    // android: {
    //   packageName: 'nl.finallygettingmarried.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
    // dynamicLinkDomain: 'example.page.link'
  };

  if (!url) {
    return { result, error: `no url ${url}` };
  }

  try {
    // result = await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
    result = await sendSignInLinkToEmail(auth, email, actionCodeSettings); // Request email link
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the sign-in result and error (if any)
}

export async function completeSignIn(email: string, emailLink?: string) {
  let result = null, // Variable to store the sign-in result
    error = null; // Variable to store any error that occurs

  try {
    result = await signInWithEmailLink(auth, email, emailLink ); // Request email link
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-in
  }

  return { result, error }; // Return the sign-in result and error (if any)
}
