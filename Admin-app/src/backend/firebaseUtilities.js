import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const getTableData = async (collectionPath) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const returnValue = querySnapshot.docs.map((patient) => patient.data());
    return returnValue;
  } catch (error) {
    console.error("[getTableData]" + error);
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

export { getTableData, getTableDataItem, populateTable, getDocRef };
