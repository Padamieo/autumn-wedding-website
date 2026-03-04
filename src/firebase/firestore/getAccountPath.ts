'use server'

import initializeAdmin from "../admin";

const admin = await initializeAdmin();
const path = process.env.FIREBASE_ACCOUNT_COLLECTION;
const password = process.env.INVITATION_PASSWORD;

// Function to determine password truth and get account path
export default async function getAccountPath(token: string, submit: string) {
  let result = null;
  let error = null;

  return await admin.auth().verifyIdToken(token).then(async (_decodedToken) => {

    if (password !== submit) {
      return { result, error: 'invalid password' };
    }

    if (!path) {
      return { result, error: 'No FIREBASE_ACCOUNT_COLLECTION setup' };
    }

    return { result: path, error };
  }).catch((error) => {
    return { result, error };
  });
};
