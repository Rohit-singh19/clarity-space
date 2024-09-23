import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "clarity-space.firebaseapp.com",
  projectId: "clarity-space",
  storageBucket: "clarity-space.appspot.com",
  messagingSenderId: "648741575395",
  appId: "1:648741575395:web:b24977915c72665f4e83d6",
  measurementId: "G-EKYFPE1RMM",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
