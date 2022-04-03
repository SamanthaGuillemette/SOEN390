import {
  getDocRef,
  getReviewNotification,
  getTableDataItem,
} from "./firebaseUtilities";
import { updateDoc } from "firebase/firestore";

const tableName = "Client";

const getPatient = async (key) => {
  return getTableDataItem(tableName, key);
};

const setSeen = async (patientKey, documentID) => {
  try {
    // Get review notifications
    const docRef = getDocRef(
      `Client/${patientKey}/reviewNotification`,
      documentID
    );
    let reviewNotification = await getReviewNotification(docRef);

    // Set reviewed value
    let seen;

    if (reviewNotification) {
      if (
        reviewNotification.seen === null ||
        reviewNotification.seen === "False"
      ) {
        seen = "True";
      } else {
        seen = "False";
      }
    }

    // Update DB with new value
    docRef && (await updateDoc(docRef, "seen", seen));

    // Get updated notification
    reviewNotification = await getReviewNotification(docRef);

    return reviewNotification;
  } catch (error) {
    console.log("[setSeen]" + error);
  }
};

export { setSeen };
