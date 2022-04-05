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
  getDoc,
  addDoc,
  serverTimestamp,
  doc,
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
        patientInfo.flaggedPriority === null ||
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

const setReviewed = async (patientKey, docID) => {
  try {
    // Get Patient
    const docRef = getDocRef(`${tableName}/${patientKey}/Status`, docID);
    let statusInfo = await getStatus(docRef);

    // Set reviewed value
    let reviewed;

    if (statusInfo) {
      if (statusInfo.reviewed === null || statusInfo.reviewed === false) {
        reviewed = true;
      } else {
        reviewed = false;
      }
    }

    // Update DB with new value
    docRef && (await updateDoc(docRef, "reviewed", reviewed));

    // Get updated patient
    statusInfo = await getStatus(docRef);

    return statusInfo.reviewed; // returning reviewed value
  } catch (error) {
    console.log("[setReviewed]" + error);
  }
};

const getStatus = async (docRef) => {
  try {
    const docSnapShot = await getDoc(docRef);

    // If file exists, return it
    if (docSnapShot.exists()) {
      console.log("Table Data Item Found!");
      return docSnapShot.data();
    } else {
      // If not found, write to console.
      console.error(`[getStatus] Document not found`);
    }
  } catch (error) {
    console.log(`[getStatus] ${error}`);
    console.trace();
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
      if (patientInfo.viewedCase === null || patientInfo.viewedCase === false) {
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

const notifyExposure = async (patientKey) => {
  try {
    const patient = await getPatient(patientKey);
    const patientPostal = patient.postalCode.slice(0, -3);
    let allPatients = await getPatients();

    function filterByPostal(prop) {
      return (
        prop.postalCode.includes(patientPostal) && prop.email !== patient.email
      );
    }

    let filteredPatients = allPatients.filter(filterByPostal);

    filteredPatients.forEach(async (patient) => {
      const clientRef = doc(db, `Client/${patient.email}`);
      const notifRef = collection(clientRef, "exposureNotification");

      await addDoc(notifRef, {
        notif: "Someone near you has gotten covid.",
        timestamp: serverTimestamp(),
        seen: "False",
      });
    });
  } catch (error) {
    console.log("[notifyExposure]" + error);
  }
};

export {
  getPatients,
  getPatient,
  togglePriorityFlag,
  setAssignedDoctor,
  isValidPatientId,
  setStatus,
  setNewCase,
  viewedNewCase,
  getStatuses,
  setRecovered,
  setViewedCaseFalse,
  setReviewed,
  notifyExposure,
};
