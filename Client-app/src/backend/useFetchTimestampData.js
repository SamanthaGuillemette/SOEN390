import { useEffect, useState } from "react";
import { getTimestampTableData } from "./firebaseUtilities";

const useFetchTimeStampData = (tableName, isTodayOnly) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getTimestampTableData(tableName, isTodayOnly)
      .then((res) => {
        return res;
      })
      .then((info) => {
        setData(info);
      });
  }, [tableName, isTodayOnly]);

  return { data };
};

export { useFetchTimeStampData };
