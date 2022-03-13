import "./UpdateStatus.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

function SymptomsTable() {
    // Pull 'userInfoDetails' from the store (Redux centralized store)
  const userInfoDetails = useSelector(
    (state) => state.userInfo.userInfoDetails
  );

  return (
    <TableContainer sx={{mt: 5}}>
    <Typography className="updateSymptoms-label" align="center">Symptoms</Typography>
    <Table sx={{ width: 350 }} aria-label="spanning table">
      <TableBody>
          <TableRow>
            <TableCell 
              className="header"
              sx={{ borderColor: "var(--primary-light)" }}
              align="left"
            >
              Muscle pain
            </TableCell>
            <TableCell
                className="data"
                sx={{ borderColor: "var(--primary-light)" }}
                align="right"
              >
                {userInfoDetails?.musclePain}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell 
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
              style={{ width: 120 }}
              align="left"
            >
              Fever
            </TableCell>
            <TableCell
                className="data"
                sx={{ borderColor: "var(--secondary-light)" }}
                align="right"
              >
                {userInfoDetails?.fever}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell 
              className="header"
              sx={{ borderColor: "var(--primary-light)" }}
              align="left"
            >
              Sore Throat
            </TableCell>
            <TableCell
                className="data"
                sx={{ borderColor: "var(--primary-light)" }}
                align="right"
              >
                {userInfoDetails?.soreThroat}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell 
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="left"
            >
              Cough
            </TableCell>
            <TableCell
                className="data"
                sx={{ borderColor: "var(--secondary-light)" }}
                align="right"
              >
                {userInfoDetails?.cough}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell 
              className="header"
              sx={{ borderColor: "var(--primary-light)" }}
              align="left"
            >
              Runny Nose
            </TableCell>
            <TableCell
                className="data"
                sx={{ borderColor: "var(--primary-light)" }}
                align="right"
              >
                {userInfoDetails?.runnyNose}
            </TableCell>
            </TableRow>
          <TableRow>
            <TableCell 
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="left"
            >
              Smell Loss
            </TableCell>
            <TableCell
                className="data"
                sx={{ borderColor: "var(--secondary-light)" }}
                align="right"
              >
                {userInfoDetails?.smellLoss}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell 
              className="header"
              sx={{ borderColor: "transparent" }}
              align="left"
            >
              Taste Loss
            </TableCell>
            <TableCell
                className="data"
                sx={{ borderColor: "transparent" }}
                align="right"
              >
                {userInfoDetails?.tasteLoss}
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default SymptomsTable;