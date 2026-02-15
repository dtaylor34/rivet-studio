// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf8X6JkqPME12Pp61c9qzi8LaUi6zRhLw",
  authDomain: "rivet-studio-dots.firebaseapp.com",
  projectId: "rivet-studio-dots",
  storageBucket: "rivet-studio-dots.firebasestorage.app",
  messagingSenderId: "495704781945",
  appId: "1:495704781945:web:cbfaaf5470ed77422750a8",
  measurementId: "G-3CFCVCZ1M6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);