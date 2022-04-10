import { useEffect, useState } from "react";
import { getTableDataItem } from "./firebaseUtilities";

const useFetchDataItem = (tableName, key) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getTableDataItem(tableName, key)
      .then((res) => {
        return res;
      })
      .then((info) => {
        setData(info);
      });
  }, [tableName, key]);

  return { data };
};

export { useFetchDataItem };
