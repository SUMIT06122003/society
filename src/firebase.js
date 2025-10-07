// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTfydF06nhcmVz8XWfMkUo7M75BW1qmkc",
  authDomain: "society-f02c9.firebaseapp.com",
  projectId: "society-f02c9",
  storageBucket: "society-f02c9.appspot.com",
  messagingSenderId: "983714033253",
  appId: "1:983714033253:web:c3b0cf0f1b79f642f0608c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
