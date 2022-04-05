import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const getTableData = async (collectionPath) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const returnValue = querySnapshot.docs.map((doc) => doc.data());
    return returnValue;
  } catch (error) {
    console.error("[getTableData]" + error);
  }
};

const getTableDataByQuery = async (queryVal) => {
  try {
    const documents = await getDocs(queryVal);
    const returnValue = documents.docs.map((doc) => doc.data());
    return returnValue;
  } catch (error) {
    console.error("[getTableData]" + error);
  }
};

const getReviewNotification = async (docRef) => {
  try {
    const docSnapShot = await getDoc(docRef);

    // If file exists, return it
    if (docSnapShot.exists()) {
      console.log("Table Data Item Found!");
      return docSnapShot.data();
    } else {
      // If not found, write to console.
      console.error(`[getReviewNotification] Document not found`);
    }
  } catch (error) {
    console.log(`[getReviewNotification] ${error}`);
    console.trace();
  }
};

const getExposureNotification = async (docRef) => {
  try {
    const docSnapShot = await getDoc(docRef);

    // If file exists, return it
    if (docSnapShot.exists()) {
      console.log("Table Data Item Found!");
      return docSnapShot.data();
    } else {
      // If not found, write to console.
      console.error(`[getExposureNotification] Document not found`);
    }
  } catch (error) {
    console.log(`[getExposureNotification] ${error}`);
    console.trace();
  }
};

const getTableDataItem = async (tableName, key) => {
  try {
    console.log(`tableName:${tableName} id:${key}`);
    // Do call to firebase
    const docRef = doc(db, tableName, key);
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

const getDocRef = (tableName, key) => {
  return doc(db, tableName, key);
};

const populateTable = (tableName, jsonStr) => {
  try {
    console.log(`[populateTable] tableName:${tableName} jsonStr:${jsonStr}`);
    const dataRef = collection(db, tableName);

    jsonStr.map((data) => setDoc(doc(dataRef, data.id), data));
  } catch (error) {
    console.error(`[populateTable] ${error}`);
  }
};

const getPatient = async (key) => {
  return getTableDataItem("Client", key);
};

const getAdmin = async (key) => {
  return getTableDataItem("Admin", key);
};

export {
  getTableData,
  getTableDataByQuery,
  getTableDataItem,
  populateTable,
  getDocRef,
  getAdmin,
  getPatient,
  getReviewNotification,
  getExposureNotification,
};
