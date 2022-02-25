import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const getTableData = async (tableName) => {
  try
  {
    const querySnapshot = await getDocs(collection(db, tableName));
    const returnValue = querySnapshot.docs.map((patient) => patient.data());
    return returnValue;
  }
  catch(error)
  {
    console.error("[getTableData]" + error);  
  }
};

const getTableDataItem= async (tableName, id) => {
  try
  {
    console.log(`tableName:${tableName} id:${id}`);
    // Do call to firebase
    const docRef = doc(db, tableName, id);
    const docSnapShot = await getDoc(docRef);
    
    // If file exists, return it
    if (docSnapShot.exists()) {
      console.log("Table Data Item Found!");
      return docSnapShot.data();
    } 
    else {
      // If not found, write to console.
      console.error(`[getTableDataItem] Document not found`);    
    }
  }
  catch(error)
  {
    console.log(`[getTableDataItem] ${error}`);
    console.trace();  
  }
};    

const populateTable = (tableName, data) => {  
  try
  {
    const patientsRef = collection(db, tableName);

    data.map((patientData) =>
      setDoc(doc(patientsRef, patientData.id), patientData));
  }
  catch(error)
  {
    console.error("[populateTable]" + error);  
  }
}

export { getTableData, getTableDataItem, populateTable };