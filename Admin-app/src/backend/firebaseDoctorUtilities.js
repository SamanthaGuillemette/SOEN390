import { getTableData, getTableDataItem } from "./firebaseUtilities";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
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
  try {
    // Get Doctor
    const docRef = doc(db, tableName, doctorId);
    let doctorInfo = await getDoctor(doctorId);

    if (doctorInfo) {
      // Update Assigned Doctor field in Patient
      docRef && (await updateDoc(docRef, { treats: arrayUnion(patientId) }));
    }

    // Get updated patient
    doctorInfo = await getDoctor(doctorId);

    return doctorInfo;
  } catch (error) {
    console.log("[addPatientToDoctor]" + error);
  }
};

const removePatientFromDoctor = async (doctorId, patientId) => {
  try {
    // Get Doctor
    const docRef = doc(db, tableName, doctorId);
    let doctorInfo = await getDoctor(doctorId);

    if (doctorInfo) {
      // Update Assigned Doctor field in Patient
      docRef && (await updateDoc(docRef, { treats: arrayRemove(patientId) }));
    }

    // Get updated patient
    doctorInfo = await getDoctor(doctorId);

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
