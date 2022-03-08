import doctorData from "../data/doctors.json";
import { getTableData, getTableDataItem, populateTable } from "./firebaseUtilities";
import { getPatients } from "./firebasePatientUtilities";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "./firebase";

const tableName = "Doctors";
const patientLimit = 10;


const getDoctors = async () => {
    return getTableData(tableName);
  };
    
const getDoctor = async (id) => {
    return getTableDataItem(tableName, id);
};

const setTreats = async (doctorId, patientId) => {
  try 
  {
    // Get Patient
    const docRef = doc(db, tableName, doctorId);
    let doctorInfo = await getDoctor(doctorId);

    // Get All Patients
    let patients = [];
    getPatients().then((data) => {
      data.forEach((doc) => {
        patients[doc.id] = doc;
      });
    });

    let arrayOfPatients = doctorInfo.treats;
    docRef && await updateDoc(docRef, "treats", arrayOfPatients);

    if (arrayOfPatients != null)
    {
      // Make sure patientId already isn't in treat table and is a valid patient Id
      if (!(patientId in arrayOfPatients) && (patientId in patients))
      {
      // Update Assigned Doctor field in Patient
      arrayOfPatients.add(patientId);
      docRef && await updateDoc(docRef, "treats", arrayOfPatients);
      }
    }
    else
    {
      // Delete Assigned Doctor field in Patient
      docRef && await updateDoc(docRef, { "treats": deleteField() });
    }

    // Get updated patient
    doctorInfo = await getDoctor(doctorId);      

    return doctorInfo;
  }
  catch (error)
  {
    console.log("[setTreats]" + error);  
  }
};


/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */  
 const populateDoctors = () => {
    populateTable(tableName, doctorData);
  }

export { getDoctors, getDoctor, populateDoctors, patientLimit, setTreats }