import doctorData from "../data/doctors.json";
import { getTableData, getTableDataItem, populateTable } from "./firebaseUtilities";
import { getPatients } from "./firebasePatientUtilities";
import { doc, updateDoc, deleteField, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";

const tableName = "Doctors";
const patientLimit = 3;


const getDoctors = async () => {
    return getTableData(tableName);
  };

const getDoctor = async (id) => {
    return getTableDataItem(tableName, id);
};

const addPatientToDoctor = async (doctorId, patientId) => {
  try 
  {
    // Get Doctor
    const docRef = doc(db, tableName, doctorId);
    let doctorInfo = await getDoctor(doctorId);

    if (doctorInfo)
    {
      // Update Assigned Doctor field in Patient
      docRef && await updateDoc(docRef, {treats: arrayUnion(patientId)});
    }

    // Get updated patient
    doctorInfo = await getDoctor(doctorId);

    return doctorInfo;
  }
  catch (error)
  {
    console.log("[addPatientToDoctor]" + error);  
  }
} 

const removePatientFromDoctor = async (doctorId, patientId) => {
  try 
  {
    // Get Doctor
    const docRef = doc(db, tableName, doctorId);
    let doctorInfo = await getDoctor(doctorId);

    if (doctorInfo)
    {
      // Update Assigned Doctor field in Patient
      docRef && await updateDoc(docRef, {treats: arrayRemove(patientId)});
    }

    // Get updated patient
    doctorInfo = await getDoctor(doctorId);

    return doctorInfo;
  }
  catch (error)
  {
    console.log("[removePatientFromDoctor]" + error);  
  }
} 

/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */  
 const populateDoctors = () => {
    populateTable(tableName, doctorData);
  }

/*       // Make sure patientId already isn't in treat table and is a valid patient Id
      if (!(patientId in arrayOfPatients) && (patientId in patients))
      {
      // Update Assigned Doctor field in Patient
      arrayOfPatients.add(patientId);
      docRef && await updateDoc(docRef, "treats", arrayOfPatients);
      }
 */

    // Get All Patients
    // let patients = [];
    // getPatients().then((data) => {
    //   data.forEach((doc) => {
    //     patients[doc.id] = doc;
    //   });
    // });




export { getDoctors, getDoctor, populateDoctors, patientLimit, addPatientToDoctor, removePatientFromDoctor }