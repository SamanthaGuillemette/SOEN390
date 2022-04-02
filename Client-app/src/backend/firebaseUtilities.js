import { getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

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

const getPatient = async (key) => {
  return getTableDataItem("Client", key);
};

const getAdmin = async (key) => {
  return getTableDataItem("Admin", key);
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

export { getAdmin, getPatient, getTableDataByQuery };
