'use server'

import admin from 'firebase-admin';

// Check if a Firebase Admin app is already initialized
export async function initializeAdmin() {
  if (!admin.apps.length) {
    return await admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
    });
  } else {
    return admin.app(); // If already initialized, use that one
  }
}

export default initializeAdmin;
