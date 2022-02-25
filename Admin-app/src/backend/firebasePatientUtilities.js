import patientData from "../data/patients.json";
import { db } from "./firebase";
import { getTableData, getTableDataItem, populateTable } from "./firebaseUtilities";
import { doc, updateDoc } from "firebase/firestore";

const tableName = "Patients";
const useOld = false; // In case we want to use the non-DB version for patients
console.log(`[useOld]: ${useOld}`);

const getPatients = async () => {
  return getTableData(tableName);
};
  
const getPatient = async (id) => {
  return getTableDataItem(tableName, id);
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



/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */  
const populatePatients = () => {
  populateTable(patientData);
}

  export { getPatients, getPatient, populatePatients, togglePriorityFlag, useOld };
  