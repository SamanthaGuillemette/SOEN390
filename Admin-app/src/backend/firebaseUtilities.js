
import { collection, doc, getDocs, getDoc, setDoc  } from "firebase/firestore";
import patientData from "../data/patients.json";
import { db } from "./firebase";

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
  
  /**
   * This function populates the Patient table in firebase given a JSON file
   * imported at the beginning of this file
   */  
  const populatePatients = () => {
    const patientsRef = collection(db, "Patients");
  
    patientData.map((patientData) =>
      setDoc(doc(patientsRef, patientData.id), patientData));
  }

  export { getPatients, getPatient, populatePatients };
  