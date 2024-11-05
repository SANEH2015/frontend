// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbNUJjtk-b6bp32xBfNiuM-8fHFaELHxU",
  authDomain: "shopping-app-eafd0.firebaseapp.com",
  projectId: "shopping-app-eafd0",
  storageBucket: "shopping-app-eafd0.firebasestorage.app",
  messagingSenderId: "899490231266",
  appId: "1:899490231266:web:9e4108b0ed72cb4f2fbfbb",
  measurementId: "G-QK2EZP02VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const firestore = getFirestore(app);
const storage = getStorage(app);

// Conditionally initialize Analytics if supported


export { firestore, storage }; // Only export what you need
