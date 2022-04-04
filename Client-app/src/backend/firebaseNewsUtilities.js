import { getTableData, getTableDataByQuery } from "./firebaseUtilities";
import { query, where, collection, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const tableName = "News";

const getNews = async (isTodayOnly = false) => {
  console.log(`[getNews]: `);
  const returnValue = await getTableData(tableName);
  console.log(`[getNews id]: ${JSON.stringify(returnValue)}`);
  return returnValue;

  /*
  const dbString = `${tableName}`;
   const queryItems = await getNewsQuery(dbString, isTodayOnly);

  const items = await getTableDataByQuery(queryItems);
  console.log(`[getNews Items]: ${items}`);

  return items;
 */
};

const getNewsQuery = async (dbString, isTodayOnly) => {
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
    return query(collection(db, dbString), orderBy("PostedDate", "desc"));
  }
};

export { getNews };
