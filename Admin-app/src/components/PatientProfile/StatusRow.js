/**
 * @fileoverview This component takes care of the PatientProfile's Symptoms table's row.
 *
 */
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { setReviewed } from "../../backend/firebasePatientUtilities";
import { doc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../backend/firebase";

/**
 * SymptomsRow function works for setting & displaying the synptoms row of the patient
 * @param  {} props
 */
function StatusRow(props) {
  const { row } = props;
  const { key } = useParams();
  const [reviewedStatus, setReviewedStatus] = useState(row.reviewed);

  function onClickReviewed(docID) {
    setReviewed(key, docID).then((newReviewedValue) =>
      setReviewedStatus(newReviewedValue)
    );
    addStatusReviewedNotif();
  }

  // This function will add notifications to the client's doc if status is reviewed
  const addStatusReviewedNotif = async () => {
    const clientRef = doc(db, `Client/${key}`);
    const notifRef = collection(clientRef, "reviewNotification");
    await addDoc(notifRef, {
      notif: "Status Reviewed",
      timestamp: serverTimestamp(),
      seen: "False",
    });
  };

  return (
    <TableRow
      key={row.Date}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
      className={!reviewedStatus ? "PATIENT__reviewed-status" : ""}
    >
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        component="th"
        scope="row"
      >
        {row.Date}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.Fever}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.Cough}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.RunnyNose}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.MuscleAche}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.Tiredness}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.SmellLoss}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.TasteLoss}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.Temperature}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.Weight}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        <Checkbox
          checked={reviewedStatus}
          size="small"
          style={{ color: "var(--text-primary)" }}
          onClick={() => onClickReviewed(row.docID)}
        />
      </TableCell>
    </TableRow>
  );
}

export default StatusRow;
