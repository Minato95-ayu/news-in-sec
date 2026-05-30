import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

const isConfigured = !!process.env.FIREBASE_ADMIN_PRIVATE_KEY && !process.env.FIREBASE_ADMIN_PRIVATE_KEY.includes('YOUR_KEY');

let adminApp;
if (isConfigured) {
  adminApp = !getApps().length
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApps()[0];
} else {
  // Mock app to prevent crash
  adminApp = !getApps().length ? initializeApp({ projectId: "mock-project" }) : getApps()[0];
}

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
export { adminApp };
