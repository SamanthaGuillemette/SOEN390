/**
 * @fileoverview This component displays the Diary table for patient
 *
 */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import "./DiaryTable.css";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import DiaryEntryModal from "./DiaryEntryModal";
import DiaryAddModal from "./DiaryAddModal";
import { useSelector } from "react-redux";
import { getDiary } from "../../backend/firebasePatientUtilities";

/**
 * Create hardcoded data for the table
 * @param  {string} Date
 * @param  {string} PostalCode
 */
function createData(Date, PostalCode) {
  return { Date: Date, PostalCode: PostalCode };
}

// creating data

function DiaryTable() {
  const [openEntry, setOpenEntry] = useState(false);

  const handleEntryOpen = () => setOpenEntry(true);
  const handleEntryClose = () => setOpenEntry(false);

  const [patientDiaries, setPatientDiaries] = useState([]);

  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector((state) => state.auth.userEmail);

  // Get Patient Info each time page refreshes
  useEffect(() => {
    getDiary(userEmail, false)
      .then((diaries) => {
        diaries &&
          setPatientDiaries(
            diaries.map((diary) =>
              createData(
                diary?.timestamp?.toDate()?.toLocaleString() || "",
                diary.postalCode || "",
                diary.description || "",
                diary.location || ""
              )
            )
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  return (
    <TableContainer className="diary__list">
      <Grid className="diary__label" container spacing={2}>
        <Grid item xs={8}>
          <NoteAltIcon
            className="diary__header__icon"
            alt="Diary"
            onClick={() => handleEntryOpen()}
          />
          Diary List
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <DiaryAddModal></DiaryAddModal>
        </Grid>
      </Grid>
      {/* Making Table */}
      <Table sx={{ minWidth: 50 }} aria-label="custom pagination table">
        {/* Displaying Table headers */}
        <TableHead>
          <TableRow>
            {/* First column header */}
            <TableCell
              className="diary_text"
              sx={{
                borderColor: "var(--secondary-light)",
              }}
            ></TableCell>
            {/* Second column header */}
            <TableCell
              className="diary_text"
              sx={{ borderColor: "var(--secondary-light)" }}
            >
              Date
            </TableCell>
            {/* Third column header */}
            <TableCell
              className="diary_text"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Postal Code
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Displaying the data created */}
        <TableBody>
          {patientDiaries &&
            patientDiaries.map((row) => (
              <TableRow key={row.date}>
                <TableCell
                  className="data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  component="th"
                  scope="row"
                >
                  <DiaryEntryModal row={row} />
                </TableCell>
                <TableCell
                  className="data diary_text"
                  sx={{ borderColor: "var(--primary-light)" }}
                  component="th"
                  scope="row"
                >
                  {row.Date}
                </TableCell>
                <TableCell
                  className="data diary_text"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.PostalCode}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              className="footer"
              sx={{ backgroundColor: "var(--background-main)" }}
              component="th"
              scope="row"
            ></TableCell>
            <TableCell
              className="footer"
              sx={{ backgroundColor: "var(--background-main)" }}
              style={{ width: 160 }}
              align="right"
            ></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default DiaryTable;
