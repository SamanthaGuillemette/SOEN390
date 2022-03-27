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

const setDisabled = async (patientKey) => {
  console.log("[setStatus]" + patientKey);
  try {

    // Get Admin
    const docRef = getDocRef("Admin", patientKey);
    let adminInfo = await getAdmin(patientKey);

    // Set new disabled value
    let newDisabledValue;

    if (adminInfo) { // if account exists
      if (
        adminInfo.disabled == null ||
        adminInfo.disabled === "false"  // if the value stored is false or null
      ) {
        newDisabledValue = "true"; // new value to be replace is true
      } else {
        newDisabledValue = "false"; // esle false
      }
    }

    // Update disabled field in admin account
    docRef && (await updateDoc(docRef, "disabled", newDisabledValue));

    // Get updated admin account
    adminInfo = await getAdmin(patientKey);

    return adminInfo.disabled; // returning new disabled value

  } catch (error) {
    console.log("[setDisabled]" + error);
  }
};

export {
  getAdminsByRole,
  getAdminByRoleAndKey,
  getAdminRef,
  getAdmins,
  getAdmin,
  setDisabled,
};
