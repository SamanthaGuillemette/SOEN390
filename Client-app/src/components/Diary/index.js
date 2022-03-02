import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NoteIcon from "../../assets/note.svg";
import "./DiaryTable.css";

// function to create data
function createData(diaryDate, contactName) {
  return { diaryDate, contactName };
}

// creating data
const rows = [
  createData("05/02/22", "Jane Doe"),
  createData("22/03/22", "Wendy Gables"),
];

function DiaryTable() {
  return (
    <TableContainer className="diary-list">
      <Box className="label">
        {" "}
        {/* Making Label Box */}
        <img className="symptoms__icon" src={NoteIcon} alt="Diary" />{" "}
        {/* Adding Label */}
        Diary List {/* Adding text */}
      </Box>
      {/* Making Table */}
      <Table sx={{ minWidth: 50 }} aria-label="custom pagination table">
        {/* Displaying Table headers */}
        <TableHead>
          <TableRow>
            {/* First column header */}
            <TableCell
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
            >
              Contact Date
            </TableCell>
            {/* Second column header */}
            <TableCell
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Contact Name
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
                {row.diaryDate}
              </TableCell>
              <TableCell
                className="data"
                sx={{ borderColor: "var(--primary-light)" }}
                style={{ width: 160 }}
                align="right"
              >
                {row.contactName}
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
