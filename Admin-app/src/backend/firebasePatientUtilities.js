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

const setNewCase = async (patientKey, newValue) => {
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    // if patient exists
    if (patientInfo) {
      // Update newCase field in Patient
      docRef && (await updateDoc(docRef, "newCase", newValue));
    }

    // Get updated patient
    patientInfo = await getPatient(patientKey);

    return patientInfo; // returning new info
  } catch (error) {
    console.log("[setNewCase]" + error);
  }
};

const viewedNewCase = async (patientKey) => {
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    // Set viewed value
    let viewed;

    if (patientInfo) {
      if (patientInfo.viewedCase == null || patientInfo.viewedCase === false) {
        viewed = true;
      } else {
        viewed = false;
      }
    }

    // Update DB with new value
    docRef && (await updateDoc(docRef, "viewedCase", viewed));

    // Get updated patient
    patientInfo = await getPatient(patientKey);

    return patientInfo;
  } catch (error) {
    console.log("[viewedNewCase]" + error);
  }
};

/**
 * Obtain the tuples from the Status subcollection of a Client
 *
 * @param {*} patientKey
 * @returns Status tuples
 */
const getStatuses = async (patientKey, isTodayOnly = false) => {
  console.log("[getStatuses]: " + patientKey);
  const statusCollectionName = "Status";
  const dbString = `${getTableName()}/${patientKey}/${statusCollectionName}`;

  const queryStatuses = await getStatusesQuery(dbString, isTodayOnly);

  const statuses = await getTableDataByQuery(queryStatuses);

  return statuses;
};

const getStatusesQuery = async (dbString, isTodayOnly) => {
  console.log("[isTodayOnly]: " + isTodayOnly);

  if (isTodayOnly === true) {
    // Set time to today @ 0:00 hrs
    const tempDate = new Date();
    const todayDate = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate()
    );

    return query(
      collection(db, dbString),
      where("timestamp", ">", todayDate),
      orderBy("timestamp", "desc")
    );
  } else {
    return query(collection(db, dbString), orderBy("timestamp", "desc"));
  }
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

const setViewedCaseFalse = async (patientKey) => {
  try {
    // Get Patient
    const docRef = getDocRef(tableName, patientKey);
    let patientInfo = await getPatient(patientKey);

    if (patientInfo) {
      // Update DB with new value
      docRef && (await updateDoc(docRef, "viewedCase", false));
    }

    // Get updated patient
    patientInfo = await getPatient(patientKey);

    return patientInfo;
  } catch (error) {
    console.log("[setViewedCase]" + error);
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
  setNewCase,
  viewedNewCase,
  getStatuses,
  setRecovered,
  setViewedCaseFalse,
};
