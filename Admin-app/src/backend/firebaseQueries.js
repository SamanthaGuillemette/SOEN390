import { query, where, collection, orderBy } from "firebase/firestore";
import { db } from "./firebase";

const getUpcomingQuery = async (dbString, isUpcomingOnly) => {
  console.log("[isTodayOnly]: " + isUpcomingOnly);
  const startDateAttr = "startDate2";

  if (isUpcomingOnly === true) {
    // Set time to today @ 0:00 hrs
    const todayDate = new Date();

    return query(
      collection(db, dbString),
      where(startDateAttr, ">=", todayDate),
      orderBy(startDateAttr, "desc")
    );
  } else {
    return query(collection(db, dbString), orderBy(startDateAttr, "desc"));
  }
};

export { getUpcomingQuery };
