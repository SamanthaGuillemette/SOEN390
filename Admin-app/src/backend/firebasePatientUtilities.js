import patientData from "../data/patients.json";
import { db } from "./firebase";
import { getTableData, getTableDataItem, populateTable } from "./firebaseUtilities";
import { doc, updateDoc, deleteField } from "firebase/firestore";

const tableName = "Patients";

const getPatients = async () => {
  return getTableData(tableName);
};
  
const getPatient = async (id) => {
  return getTableDataItem(tableName, id);
};

const isValidPatientId = async (id) => {
  return getPatient(id) != null;
};

const togglePriorityFlag = async (id) => {
  try
  {
    // Get Patient
    const docRef = doc(db, tableName, id);
    let patientInfo = await getPatient(id);

    // Set priorityFlag value 
    let priorityFlag;

    if (patientInfo)
    {
      if (patientInfo.flaggedPriority === '0')
      {
        priorityFlag = "1";
      }
      else
      {
        priorityFlag = "0";
      }
    }

    // Update DB with new value
    docRef && await updateDoc(docRef, "flaggedPriority", priorityFlag);

    // Get updated patient
    patientInfo = await getPatient(id);      

    return patientInfo;
  }

  catch(error)
  {
    console.log("[togglePriorityFlag]" + error);  
  }
};

const setAssignedDoctor = async (patientId, doctorId) => {
  try 
  {
    // Get Patient
    const docRef = doc(db, tableName, patientId);
    let patientInfo = await getPatient(patientId);

    if (doctorId != null)
    {
      // Update Assigned Doctor field in Patient
      docRef && await updateDoc(docRef, "assignedDoctor", doctorId);
    }
    else
    {
      // Delete Assigned Doctor field in Patient
      docRef && await updateDoc(docRef, { "assignedDoctor": deleteField() });
    }

    // Get updated patient
    patientInfo = await getPatient(patientId);      

    return patientInfo;
  }
  catch (error)
  {
    console.log("[setAssignedDoctor]" + error);  
  }
};

/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */  
const populatePatients = () => {
  populateTable(tableName, patientData);
}

  export { getPatients, getPatient, populatePatients, togglePriorityFlag,setAssignedDoctor, isValidPatientId };
  