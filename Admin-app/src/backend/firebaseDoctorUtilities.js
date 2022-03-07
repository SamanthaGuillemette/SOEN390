import doctorData from "../data/doctors.json";
import { getTableData, getTableDataItem, populateTable } from "./firebaseUtilities";

const tableName = "Doctors";
const patientLimit = 10;


const getDoctors = async () => {
    return getTableData(tableName);
  };
    
const getDoctor = async (id) => {
    return getTableDataItem(tableName, id);
};

/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */  
 const populateDoctors = () => {
    populateTable(tableName, doctorData);
  }

export { getDoctors, getDoctor, populateDoctors, patientLimit }