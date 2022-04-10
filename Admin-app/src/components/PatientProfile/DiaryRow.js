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
function DiaryRow(props) {
  const { row } = props;
  const { key } = useParams();

  return (
    <TableRow
      key={row.Date}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        component="th"
        scope="row"
      >
        {row.DateDiary}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.Description}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.Location}
      </TableCell>
      <TableCell
        className="PATIENT-SYMPTOMS__table__data"
        sx={{ borderColor: "var(--background-secondary)" }}
        align="center"
      >
        {row.PostalCode}
      </TableCell>
    </TableRow>
  );
}

export default DiaryRow;
