import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";
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

const setRole = async (patientKey) => {
  console.log("[setStatus]" + patientKey);
  try {

    // Get Admin
    const docRef = getDocRef("Admin", patientKey);
    let adminInfo = await getAdmin(patientKey);

    if (adminInfo) {
      // Update role field in admin account
      docRef && (await updateDoc(docRef, "role", "disabled"));
    }

    // Get updated adminn account
    adminInfo = await getAdmin(patientKey);

    return adminInfo;
  } catch (error) {
    console.log("[setRole]" + error);
  }
};

export {
  getAdminsByRole,
  getAdminByRoleAndKey,
  getAdminRef,
  getAdmins,
  getAdmin,
};
