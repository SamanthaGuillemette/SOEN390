/**
 * @fileoverview This file holds the firebase credentials (configuration).
 * It allows to connect to the database and authenticate the user securely.
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXeBgqncd708qRswIsQR858CV_mKJecyw",
  authDomain: "covid-tracking-cfa70.firebaseapp.com",
  projectId: "covid-tracking-cfa70",
  storageBucket: "covid-tracking-cfa70.appspot.com",
  messagingSenderId: "1003878779137",
  appId: "1:1003878779137:web:0982691e034a38237f7300",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
