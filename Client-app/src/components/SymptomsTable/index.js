import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";import VirusIcon from "../../assets/virus.svg";
import "./SymptomsTable.css";

// function to create data
function createData(symptomDate, status) {
  return { symptomDate, status };
}

// creating data
const rows = [
  createData("05/02/22", <span className="label-negative">negative</span>),
  createData("22/03/22", <span className="label-positive">positive</span>),
];

function SymptomsTable() {
  return (
    <TableContainer className="symptoms-list">
      <Box className="label"> {/* Making Label Box */}
        <img className="symptoms__icon" src={VirusIcon} alt="Symptoms" /> {/* Adding Label */}
        Symptoms List {/* Adding text */}
      </Box>
      {/* Making Table */}
      <Table sx={{ minWidth: 50 }} aria-label="custom pagination table">
        {/* Displaying Table headers */}
        <TableHead>
          <TableRow>
            {/* First column header */}
            <TableCell
              className="SYMPTOMS__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
            >
              Date of Contact
            </TableCell>
            {/* Second column header */}
            <TableCell
              className="SYMPTOMS__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Displaying the data created */}
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                className="SYMPTOMS__table__data"
                sx={{ borderColor: "var(--primary-light)" }}
                component="th"
                scope="row"
              >
                {row.symptomDate}
              </TableCell>
              <TableCell
                className="SYMPTOMS__table__data"
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
              sx={{ backgroundColor: "var(--background-main)" }}
              component="th"
              scope="row"
            ></TableCell>
            <TableCell
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