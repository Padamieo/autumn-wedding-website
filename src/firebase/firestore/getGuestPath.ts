'use server'

import initializeAdmin from "../admin";

const admin = await initializeAdmin();
const path = process.env.FIREBASE_GUEST_COLLECTION;

// Function to get guest collection path
export default async function getGuestPath(token: string) {
  let result = null;
  let error = null;

  return await admin.auth().verifyIdToken(token).then(async (_decodedToken) => {
    
    if (!path) {
      return { result, error: 'No FIREBASE_GUEST_COLLECTION setup' };
    }

    return { result: path, error };
  }).catch((error) => {
    return { result, error };
  });
}
