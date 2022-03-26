import doctorData from "../data/doctors.json";
import patientData from "../data/patients.json";
import { populateTable } from "./firebaseUtilities";
import { tableName as patientTableName } from "./firebasePatientUtilities";
import { tableName as doctorTableName } from "./firebaseDoctorUtilities";

/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */
const populatePatients = () => {
  populateTable(patientTableName, patientData);
};

/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */
const populateDoctors = () => {
  populateTable(doctorTableName, doctorData);
};

export { populatePatients, populateDoctors };
