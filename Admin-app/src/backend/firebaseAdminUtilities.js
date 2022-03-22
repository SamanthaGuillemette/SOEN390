import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { getTableDataItem, getDocRef } from "./firebaseUtilities";

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

export { getAdminsByRole, getAdminByRoleAndKey, getAdminRef };
