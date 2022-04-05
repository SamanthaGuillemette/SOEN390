import { useEffect, useState } from "react";
import { getTimestampTableData, getTableData } from "./firebaseUtilities";

const useFetchData = (tableName, isTodayOnly) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getTableData(tableName, isTodayOnly)
      .then((res) => {
        return res;
      })
      .then((info) => {
        setData(info);
      });
  }, [tableName, isTodayOnly]);

  return { data };
};

export { useFetchData };
