import { getTableDataByQuery } from "./firebaseUtilities";
import { query, where, collection, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const tableName = "Client";

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

const getTableName = () => {
  return tableName;
};

export { getStatuses };
