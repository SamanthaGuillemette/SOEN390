import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

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

const getPatient = async (key) => {
  return getTableDataItem("Client", key);
};

const getAdmin = async (key) => {
  return getTableDataItem("Admin", key);
};

export {
  getAdmin,
  getPatient,
  getReviewNotification,
  getDocRef,
  getTableDataItem,
};