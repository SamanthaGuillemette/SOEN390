import "./UpdateStatus.css";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import StatusModal from "./StatusModal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


// function to create data
function createData(symptomDate, temperature, weight, fever, soreThroat, cough, runnyNose, smellLoss, musclePain) {
  return { symptomDate, temperature, weight, fever, soreThroat, cough, runnyNose, smellLoss, musclePain};
}

// creating data
const rows = [
  createData("01/01/22", "39.5", "150 kg", "Yes", "No", "No", "No", "Yes", "No"),
];


function UpdateStatus() {
  return (
    <Grid container justifyContent="center">
      <TableContainer className="updateStatus-table"><StatusModal></StatusModal>
        <Box className="updateStatus-label">
          Status
        </Box>
        <Table sx={{ width: 350 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                className="header"
                sx={{ borderColor: "var(--secondary-light)" }}
                style={{ width: 400 }}
              >
                Date
              </TableCell>
              <TableCell
                className="header"
                sx={{ borderColor: "var(--secondary-light)" }}
                style={{ width: 200 }}
                align="right"
              >
                Temperature
              </TableCell>
              <TableCell
                className="header"
                sx={{ borderColor: "var(--secondary-light)" }}
                style={{ width: 400 }}
                align="right"
              >
                Weight
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
                  align="right"
                >
                  {row.temperature}
                </TableCell>
                <TableCell
                  className="data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  align="right"
                >
                  {row.weight}
                </TableCell>
              </TableRow>
            ))}
            
            <TableRow>
              <TableCell rowSpan={7} />
              <TableCell 
              colSpan={2}
              className="header"
              sx={{ borderColor: "var(--secondary-light)" }}
              >
                Symptoms
              </TableCell>
            </TableRow>

            {rows.map((row) => (
              <TableRow>
                <TableCell 
                  className="header"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 120 }}
                  align="right"
                >
                  Fever
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--primary-light)" }}
                    align="right"
                  >
                    {row.fever}
                </TableCell>
              </TableRow>
            ))}
          {rows.map((row) => (
              <TableRow>
                <TableCell 
                  className="header"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="right"
                >
                  Sore Throat
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--secondary-light)" }}
                    align="right"
                  >
                    {row.soreThroat}
                </TableCell>
              </TableRow>
            ))}

          {rows.map((row) => (
              <TableRow>
                <TableCell 
                  className="header"
                  sx={{ borderColor: "var(--primary-light)" }}
                  align="right"
                >
                  Cough
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--primary-light)" }}
                    align="right"
                  >
                    {row.cough}
                </TableCell>
              </TableRow>
            ))}

            {rows.map((row) => (
              <TableRow>
                <TableCell 
                  className="header"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="right"
                >
                  Runny Nose
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--secondary-light)" }}
                    align="right"
                  >
                    {row.runnyNose}
                </TableCell>
              </TableRow>
            ))}

            {rows.map((row) => (
              <TableRow>
                <TableCell 
                  className="header"
                  sx={{ borderColor: "var(--primary-light)" }}
                  align="right"
                >
                  Smell Loss
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--primary-light)" }}
                    align="right"
                  >
                    {row.smellLoss}
                </TableCell>
              </TableRow>
            ))}

            {rows.map((row) => (
              <TableRow>
                <TableCell 
                  className="header"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="right"
                >
                  Muscle pain
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--secondary-light)" }}
                    align="right"
                  >
                    {row.musclePain}
                </TableCell>
              </TableRow>
            ))}
          
          </TableBody>
          <TableFooter>
            <TableRow>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default UpdateStatus;
