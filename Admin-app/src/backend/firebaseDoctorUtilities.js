import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {
  getAdminsByRole,
  getAdminByRoleAndKey,
  getAdminRef,
} from "./firebaseAdminUtilities";

const role = "Doctor";
const patientLimit = 3;

const getDoctors = async () => {
  return getAdminsByRole(role);
};

const getDoctor = async (key) => {
  return getAdminByRoleAndKey(role, key);
};

const addPatientToDoctor = async (doctorKey, patientKey) => {
  try {
    // Get Doctor
    const docRef = getAdminRef(doctorKey);
    let doctorInfo = await getDoctor(patientKey);

    if (doctorInfo) {
      // Update Assigned Doctor field in Patient
      docRef && (await updateDoc(docRef, { treats: arrayUnion(patientKey) }));
    }

    // Get updated patient
    doctorInfo = await getDoctor(doctorKey);

    return doctorInfo;
  } catch (error) {
    console.log("[addPatientToDoctor]" + error);
  }
};

const removePatientFromDoctor = async (doctorKey, patientKey) => {
  try {
    // Get Doctor
    const docRef = getAdminRef(doctorKey);
    let doctorInfo = await getDoctor(doctorKey);

    if (doctorInfo) {
      // Update Assigned Doctor field in Patient
      docRef && (await updateDoc(docRef, { treats: arrayRemove(patientKey) }));
    }

    // Get updated patient
    doctorInfo = await getDoctor(doctorKey);

    return doctorInfo;
  } catch (error) {
    console.log("[removePatientFromDoctor]" + error);
  }
};

/**
 * This function populates the Patient table in firebase given a JSON file
 * imported at the beginning of this file
 */
/* const populateDoctors = () => {
  populateTable(tableName, doctorData);
};
 */

export {
  getDoctors,
  getDoctor,
  patientLimit,
  addPatientToDoctor,
  removePatientFromDoctor,
};
