import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, getDocs  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAXeBgqncd708qRswIsQR858CV_mKJecyw',
  authDomain: 'covid-tracking-cfa70.firebaseapp.com',
  projectId: 'covid-tracking-cfa70',
  storageBucket: 'covid-tracking-cfa70.appspot.com',
  messagingSenderId: '1003878779137',
  appId: '1:1003878779137:web:0982691e034a38237f7300',
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

const getPatients = async () => {
  const querySnapshot = await getDocs(collection(db, "Patients"));
  const returnValue = querySnapshot.docs.map((patient) => patient.data());
  return returnValue;
};

export { db, auth, provider, getPatients };

