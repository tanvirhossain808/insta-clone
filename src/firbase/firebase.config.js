
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_INSTA_CLONE_API_KEY,
    authDomain: import.meta.env.VITE_INSTA_CLONE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_INSTA_CLONE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_INSTA_CLONE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_INSTA_CLONE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_INSTA_CLONE_APP_ID,
    measurementId: import.meta.env.VITE_INSTA_CLONE_MESUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app)