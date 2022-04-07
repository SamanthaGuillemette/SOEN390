import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import {
  getAdminsByRole,
  getAdminByRoleAndKey,
  getAdminRef,
} from "./firebaseAdminUtilities";
import { getDocRef } from "./firebaseUtilities";
import { db } from "./firebase";

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
    let doctorInfo = await getDoctor(doctorKey);

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

export {
  getDoctors,
  getDoctor,
  patientLimit,
  addPatientToDoctor,
  removePatientFromDoctor,
};
