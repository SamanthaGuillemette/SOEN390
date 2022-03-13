import "./UpdateStatus.css";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import StatusModal from "./StatusModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SymptomsTable from "./SymptomsTable";
import TableHead from "@mui/material/TableHead";

function UpdateStatus() {
    // Pull 'userInfoDetails' from the store (Redux centralized store)
  const userInfoDetails = useSelector(
    (state) => state.userInfo.userInfoDetails
  );

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <Box className="STATUS__box">
      <TableContainer>
        <StatusModal></StatusModal>
        <Typography className="updateStatus-label" align="center" sx={{mt: 1}}>STATUS</Typography>
        <Table sx={{ width: 350 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                  className="header"
                  sx={{ borderColor: "var(--primary-light)" }}
                  align="left"
                >
                  Date
                </TableCell>
                <TableCell
                  className="header"
                  sx={{ borderColor: "var(--primary-light)" }}
                  align="center"
                >
                  Temperature
                </TableCell>
                <TableCell
                    className="header"
                    sx={{ borderColor: "var(--primary-light)"}}
                    align="right"
                  >
                    Weight
                  </TableCell>
                  </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  className="data"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="left"
                >
                  {userInfoDetails?.dos}
                </TableCell>
              <TableCell
                  className="data"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="center"
                >
                  {userInfoDetails?.temperature}
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--secondary-light)" }}
                    align="right"
                  >
                    {userInfoDetails?.weight}
                  </TableCell>
              </TableRow>
          </TableBody>
        </Table>
        </TableContainer>
        <SymptomsTable/>
      </Box>
    </Grid>
  );
}

export default UpdateStatus;
