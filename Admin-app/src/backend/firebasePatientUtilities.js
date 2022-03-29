import {
  getTableData,
  getTableDataByQuery,
  getTableDataItem,
  getDocRef,
} from "./firebaseUtilities";
import {
  updateDoc,
  deleteField,
  query,
  where,
  limit,
  collection,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

const tableName = "Client";

const getPatients = async () => {
  return getTableData(tableName);
};

const getPatient = async (key) => {
  return getTableDataItem(tableName, key);
};

const isValidPatientId = async (key) => {
  return getPatient(key) != null;
};

const togglePriorityFlag = async (patientKey) => {
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    // Set priorityFlag value
    let priorityFlag;

    if (patientInfo) {
      if (
        patientInfo.flaggedPriority == null ||
        patientInfo.flaggedPriority === "0"
      ) {
        priorityFlag = "1";
      } else {
        priorityFlag = "0";
      }
    }

    // Update DB with new value
    docRef && (await updateDoc(docRef, "flaggedPriority", priorityFlag));

    // Get updated patient
    patientInfo = await getPatient(patientKey);

    return patientInfo;
  } catch (error) {
    console.log("[togglePriorityFlag]" + error);
  }
};

const toggleReviewed = async (patientKey) => {
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    // Set reviewed value
    let reviewed;

    if (patientInfo) {
      if (
        patientInfo.statusReview == null ||
        patientInfo.statusReview === "Not Completed"
      ) {
        reviewed = "Status Reviewed";
      } else {
        reviewed = "Not Completed";
      }
    }

    // Update DB with new value
    docRef && (await updateDoc(docRef, "statusReview", reviewed));

    // Get updated patient
    patientInfo = await getPatient(patientKey);

    return patientInfo;
  } catch (error) {
    console.log("[toggleReviewed]" + error);
  }
};
const setAssignedDoctor = async (patientKey, doctorKey) => {
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    if (doctorKey != null) {
      // Update Assigned Doctor field in Patient
      docRef && (await updateDoc(docRef, "assignedDoctor", doctorKey));
    } else {
      // Delete Assigned Doctor field in Patient
      docRef && (await updateDoc(docRef, { assignedDoctor: deleteField() }));
    }

    // Get updated patient
    patientInfo = await getPatient(patientKey);

    return patientInfo;
  } catch (error) {
    console.log("[setAssignedDoctor]" + error);
  }
};

const setStatus = async (patientKey, status) => {
  console.log("[setStatus]" + patientKey);
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    if (patientInfo) {
      // Update status field in Patient
      docRef && (await updateDoc(docRef, "status", status));
    }

    // Get updated patient
    patientInfo = await getPatient(patientKey);

    return patientInfo;
  } catch (error) {
    console.log("[setStatus]" + error);
  }
};

/**
 * Obtain the tuples from the Status subcollection of a Client
 *
 * @param {*} patientKey
 * @returns Status tuples
 */
const getStatuses = async (patientKey) => {
  console.log("[getStatuses]: " + patientKey);
  const statusCollectionName = "Status";
  const dbString = `${getTableName()}/${patientKey}/${statusCollectionName}`;
  const queryStatuses = query(
    collection(db, dbString),
    orderBy("timestamp", "desc")
  );

  const statuses = await getTableDataByQuery(queryStatuses);

  return statuses;
};
const setRecovered = async (patientKey, recovered) => {
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    if (patientInfo) {
      if (recovered != null) {
        // Update status field in Patient
        docRef && (await updateDoc(docRef, "recovered", recovered));
      }
    }

    // Get updated patient
    patientInfo = await getPatient(patientKey);
    return patientInfo;
  } catch (error) {
    console.log("[setRecovered]" + error);
  }
};

const getTableName = () => {
  return tableName;
};

export {
  getPatients,
  getPatient,
  togglePriorityFlag,
  setAssignedDoctor,
  isValidPatientId,
  toggleReviewed,
  setStatus,
  getStatuses,
  setRecovered,
};
