import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMytXJ-JNRG1LdfY9AW5OdZUbhIzyOXEY",
  authDomain: "shoppingapp-6d095.firebaseapp.com",
  projectId: "shoppingapp-6d095",
  storageBucket: "shoppingapp-6d095.firebasestorage.app",
  messagingSenderId: "776054261502",
  appId: "1:776054261502:web:7cd59a49e27701ed1287af"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);