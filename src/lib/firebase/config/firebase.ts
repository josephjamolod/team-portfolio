// Import required Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration for the main app (Firestore and Auth)
const mainFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Firebase configuration for the secondary app (Storage)
const storageFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_STORAGE_API_KEY1,
  authDomain: process.env.NEXT_PUBLIC_STORAGE_AUTH_DOMAIN1,
  projectId: process.env.NEXT_PUBLIC_STORAGE_PROJECT_ID1,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET1,
  messagingSenderId: process.env.NEXT_PUBLIC_STORAGE_MESSAGING_SENDER_ID1,
  appId: process.env.NEXT_PUBLIC_STORAGE_APP_ID1,
};

// Initialize the main app for Firestore and Auth
const mainApp = !getApps().length
  ? initializeApp(mainFirebaseConfig)
  : getApp();

// Initialize the secondary app for Storage
const storageApp = getApps().find((app) => app.name === "storageApp")
  ? getApp("storageApp")
  : initializeApp(storageFirebaseConfig, "storageApp");

// Initialize Firestore and Auth from the main app
const firebaseDb = getFirestore(mainApp);
const firebaseAuth = getAuth(mainApp);

// Initialize Storage from the secondary app
const firebaseStorage = getStorage(storageApp);

// Export the services
export { firebaseDb, firebaseAuth, firebaseStorage };
