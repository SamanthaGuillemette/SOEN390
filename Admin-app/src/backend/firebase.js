import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, getDocs, getDoc, setDoc  } from "firebase/firestore";
import patientData from "../data/patients.json";

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
  console.log("getPatients Called");
  const querySnapshot = await getDocs(collection(db, "Patients"));
  const returnValue = querySnapshot.docs.map((patient) => patient.data());
  return returnValue;
};

const getPatient = async (id) => {
  // Do call to firebase
  const docRef = doc(db, "Patients", id);
  const docSnapShot = await getDoc(docRef);
  
  // If file exists, return it
  if (docSnapShot.exists()) {
    console.log("Patient document Found!");
    return docSnapShot.data();
  } 
  else {
    // If not found, write to console.
    console.log("Patient document not found");
  }
  };

const populatePatients = () => {
  const patientsRef = collection(db, "Patients");

  patientData.map((patientData) =>
    setDoc(doc(patientsRef, patientData.email), patientData));
}

export { db, auth, provider, getPatients, getPatient, populatePatients };

