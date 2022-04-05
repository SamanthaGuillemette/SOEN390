import { useFetchTimeStampData } from "./useFetchTimestampData";
import { useFetchDataItem } from "./useFetchDataItem";

const tableName = "News";

const useFetchNewsData = (isTodayOnly = false) => {
  return useFetchTimeStampData(tableName, isTodayOnly);
};

const useFetchNewsDataItem = (key) => {
  return useFetchDataItem(tableName, key);
};

export { useFetchNewsData, useFetchNewsDataItem };
