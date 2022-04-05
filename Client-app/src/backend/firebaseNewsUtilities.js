import { useFetchData } from "./useFetchData";
import { useFetchDataItem } from "./useFetchDataItem";

const tableName = "News";

const useFetchNewsData = (isTodayOnly = false) => {
  return useFetchData(tableName, isTodayOnly);
};

const useFetchNewsDataItem = (key) => {
  return useFetchDataItem(tableName, key);
};

/* const getNews = async (isTodayOnly = false) => {
  console.log(`[getNews]: `);
  const dbString = `${tableName}`;
  const queryItems = await getNewsQuery(dbString, isTodayOnly);

  const items = await getTableDataByQuery(queryItems);
  console.log(`[getNews Items]: ${items}`);

  return items;
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
      where("postedDate", ">", todayDate),
      orderBy("postedDate", "desc")
    );
  } else {
    return query(collection(db, dbString), orderBy("postedDate", "desc"));
  }
};

const getNewsItem = async (key) => {
  return getTableDataItem(tableName, key);
}; */

export { useFetchNewsData, useFetchNewsDataItem };
