'use server'

import emails from "@/resend/email";
import { initializeAdmin } from "@/firebase/admin";
import actionCodeSettings from "./config";

export async function signIn(email: string, firstName?: string) {
  let result = null, error = null;
  let privateLink = null;

  const admin = await initializeAdmin();

  try {
    privateLink = await admin.auth().generateSignInWithEmailLink(email, actionCodeSettings);
  } catch (error) {
    return { result, error };
  }

  if (privateLink) {
    try {
      result = await emails({ email, privateLink, firstName });
    } catch (error) {
      return { result, error };
    }
  }
  
  return { result, error };
}