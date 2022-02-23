import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";import VirusIcon from "../../assets/virus.svg";
import "./SymptomsTable.css";

function createData(symptomDate, status) {
  return { symptomDate, status };
}

const rows = [
  createData("05/02/22", <span className="label-negative">negative</span>),
  createData("22/03/22", <span className="label-positive">positive</span>),
];

function SymptomsTable() {
  return (
    <TableContainer className="symptoms-list">
      <Box className="label">
        <img className="symptoms__icon" src={VirusIcon} alt="Symptoms" />
        Symptoms List
      </Box>
      <Table sx={{ minWidth: 50 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
            >
              Date of Contact
            </TableCell>
            <TableCell
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                className="data"
                sx={{ borderColor: "var(--primary-light)" }}
                component="th"
                scope="row"
              >
                {row.symptomDate}
              </TableCell>
              <TableCell
                className="data"
                sx={{ borderColor: "var(--primary-light)" }}
                style={{ width: 160 }}
                align="right"
              >
                {row.status}
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

export default SymptomsTable;
