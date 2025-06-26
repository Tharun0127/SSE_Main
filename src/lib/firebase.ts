import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA_za_fnS-SzAMrCc5_0LkaIhN0pWTUr8",
  authDomain: "srisaienterprisess-e5d9e.firebaseapp.com",
  projectId: "srisaienterprisess-e5d9e",
  storageBucket: "srisaienterprisess-e5d9e.appspot.com",
  messagingSenderId: "973089316419",
  appId: "1:973089316419:web:4257c5695340f77ad1bef6",
  measurementId: "G-S0RL2E7700"
};


// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics only on the client side
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, storage, analytics };
