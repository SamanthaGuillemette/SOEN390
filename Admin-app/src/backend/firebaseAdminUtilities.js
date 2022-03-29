import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { getTableData, getTableDataItem, getDocRef } from "./firebaseUtilities";

/**
 * Obtains all of the items in the "Admin Collection" (and NOT just for role 'Administrator')
 *
 * @returns all tuples in collection Admin
 */
const getAdmins = async () => {
  return getTableData(getTableName());
};

/**
 * Obtains an item in the "Admin Collection" specified by key (and NOT just for role 'Administrator')
 *
 * @param {string} key
 * @returns a tuple in collection Admin
 */
const getAdmin = async (key) => {
  return getTableDataItem(getTableName(), key);
};

const getAdminsByRole = async (roleName) => {
  try {
    const queryForRole = getQueryForRole(roleName);
    const querySnapshot = await getDocs(queryForRole);

    const returnValue = querySnapshot.docs.map((admins) => admins.data());
    return returnValue;
  } catch (error) {
    console.error("[getAdminsByRole]" + error);
  }
};

const getAdminByRoleAndKey = async (roleName, key) => {
  return getTableDataItem(getTableName(), key);
};

const getTableName = () => {
  return "Admin";
};

const getQueryForRole = (roleName) => {
  return query(collection(db, getTableName()), where("role", "==", roleName));
};

const getAdminRef = (key) => {
  return getDocRef(getTableName(), key);
};

const setNewAccount = async (patientKey) => {
  try {
    // Get Admin
    const docRef = getDocRef("Admin", patientKey);
    let adminInfo = await getAdmin(patientKey);

    // Set new disabled value
    let newAccountValue;

    if (adminInfo) {
      // if account exists
      if (
        adminInfo.newAccount === true // if the value stored is false or null
      ) {
        newAccountValue = false; // new value to be replace is true
      } else {
        newAccountValue = true; // esle false
      }
    }

    // Update disabled field in admin account
    docRef && (await updateDoc(docRef, "newAccount", newAccountValue));

    // Get updated admin account
    adminInfo = await getAdmin(patientKey);

    return adminInfo.newAccount; // returning new disabled value
  } catch (error) {
    console.log("[setNewAccount]" + error);
  }
};

export {
  getAdminsByRole,
  getAdminByRoleAndKey,
  getAdminRef,
  getAdmins,
  getAdmin,
  setNewAccount,
};
