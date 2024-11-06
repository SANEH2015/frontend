import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getAuth } from "firebase/auth";  // Import Authentication
import { getStorage } from "firebase/storage";  // Import Storage

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAbNUJjtk-b6bp32xBfNiuM-8fHFaELHxU",
  authDomain: "shopping-app-eafd0.firebaseapp.com",
  projectId: "shopping-app-eafd0",
  storageBucket: "shopping-app-eafd0.appspot.com",
  messagingSenderId: "899490231266",
  appId: "1:899490231266:web:9e4108b0ed72cb4f2fbfbb",
  measurementId: "G-QK2EZP02VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);  // Initialize Firestore and name it `db`
const auth = getAuth(app);     // Firebase Authentication instance
const storage = getStorage(app); // Firebase Storage instance

// Export services
export { db, auth, storage };  // Export the `db` (Firestore) instance
