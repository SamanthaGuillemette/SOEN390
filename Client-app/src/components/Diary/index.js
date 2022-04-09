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
import { useState } from "react";
import DiaryEntryModal from "./DiaryEntryModal";
import DiaryAddModal from "./DiaryAddModal";

/**
 * Create hardcoded data for the table
 * @param  {string} diaryDate
 * @param  {string} postalCode
 */
function createData(diaryDate, postalCode) {
  return { diaryDate, postalCode };
}

// creating data
const rows = [
  createData("05/02/22", "H3K 2Q2"),
  createData("22/03/22", "H6J 1D7"),
];

function DiaryTable() {
  const [openEntry, setOpenEntry] = useState(false);

  const handleEntryOpen = () => setOpenEntry(true);
  const handleEntryClose = () => setOpenEntry(false);

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
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                className="data"
                sx={{ borderColor: "var(--primary-light)" }}
                component="th"
                scope="row"
              >
                <DiaryEntryModal />
              </TableCell>
              <TableCell
                className="data diary_text"
                sx={{ borderColor: "var(--primary-light)" }}
                component="th"
                scope="row"
              >
                {row.diaryDate}
              </TableCell>
              <TableCell
                className="data diary_text"
                sx={{ borderColor: "var(--primary-light)" }}
                style={{ width: 160 }}
                align="right"
              >
                {row.postalCode}
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
