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

const getStatusNotifications = async (doctorKey) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `Admin/${doctorKey}/StatusNotifications`)
    );
    const returnValue = querySnapshot.docs.map((patient) => patient.data());
    return returnValue;
  } catch (error) {
    console.error("[getTableData]" + error);
  }
};

const getStatusNotificationsItem = async (docRef) => {
  try {
    // Do call to firebase
    const docSnapShot = await getDoc(docRef);

    // If file exists, return it
    if (docSnapShot.exists()) {
      console.log("Table Data Item Found!");
      return docSnapShot.data();
    } else {
      // If not found, write to console.
      console.error(`[getTableDataItem] Document not found`);
    }
  } catch (error) {
    console.log(`[getTableDataItem] ${error}`);
    console.trace();
  }
};

export {
  getDoctors,
  getDoctor,
  patientLimit,
  addPatientToDoctor,
  removePatientFromDoctor,
  getStatusNotifications,
};
