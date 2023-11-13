// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
import { getFirestore, collection, getDocs } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRFyHN6ngC0_EfRnzJ9-uXLavPAdmMniw",
  authDomain: "ebooks-b631d.firebaseapp.com",
  projectId: "ebooks-b631d",
  storageBucket: "ebooks-b631d.appspot.com",
  messagingSenderId: "753025288553",
  appId: "1:753025288553:web:bdacea38ce29a791bdd5f8",
  measurementId: "G-XF15T8PFS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const auth = getAuth();
