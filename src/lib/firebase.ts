import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCA5WE8_xlrHTnZpyCArh1YiQvrv7gpNY",
  authDomain: "srisaienterprises-892b9.firebaseapp.com",
  projectId: "srisaienterprises-892b9",
  storageBucket: "srisaienterprises-892b9.firebasestorage.app",
  messagingSenderId: "121785637733",
  appId: "1:121785637733:web:9dac1b4eeb21bd3bc6df8c",
  measurementId: "G-VGQCVPSY11",
};


// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

// Enable offline persistence for Firestore. This allows the app to work
// smoothly even with an intermittent network connection.
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code == 'failed-precondition') {
        // This can happen if multiple tabs are open.
        console.warn('Firestore persistence failed: multiple tabs open.');
      } else if (err.code == 'unimplemented') {
        // The browser is not supported.
        console.warn('Firestore persistence is not supported in this browser.');
      }
    });
}

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
