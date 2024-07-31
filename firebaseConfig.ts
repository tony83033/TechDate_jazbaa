// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth,initializeAuth,getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFmhT5YcH9WkTIg7WYq1NbK11h6j28DFk",
  authDomain: "techdate-6d0aa.firebaseapp.com",
  projectId: "techdate-6d0aa",
  storageBucket: "techdate-6d0aa.appspot.com",
  messagingSenderId: "951394784636",
  appId: "1:951394784636:web:26432de6ace22af04440f9",
  measurementId: "G-FGXWYWPN4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };

// android = 627954942332-f58195qb3bqllgl3auuafjs02vt1ggd1.apps.googleusercontent.com