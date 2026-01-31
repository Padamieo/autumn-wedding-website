'use server'

import emails from "@/resend/email";
import { initializeAdmin } from "@/firebase/admin";
import actionCodeSettings from "./config";
import { EmailContent } from "@/components/emails/auth";

// sign in with email passwordless custom email
export async function signIn(email: string, emailContent: EmailContent) {
  let result = null, error = null;
  let privateLink = null;

  const admin = await initializeAdmin();

  try {
    privateLink = await admin.auth().generateSignInWithEmailLink(email, actionCodeSettings);
  } catch (e) {
    return { result, error: e };
  }

  if (privateLink) {
    try {
      result = await emails({ email, privateLink, emailContent });
    } catch (e) {
      result = e;
    }
  }
  
  return { result, error };
}