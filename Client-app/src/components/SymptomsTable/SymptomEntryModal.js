//import "./UpdateStatus.css";
import * as React from "react";
import Grid from "@material-ui/core/Grid";
//import StatusModal from "./StatusModal";
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
import { useState } from "react";
import Fab from "@mui/material/Fab";
import VirusIcon from "../../assets/virus.svg";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import Button from "@mui/material/Button";

function SymptomEntry() {
  // Pull 'userInfoDetails' from the store (Redux centralized store)
  const userInfoDetails = useSelector(
    (state) => state.userInfo.userInfoDetails
  );
  const [openEntry, setOpenEntry] = useState(false);

  const handleEntryOpen = () => setOpenEntry(true);
  const handleEntryClose = () => setOpenEntry(false);

  return (
    <div>
      <Fab
        sx={{ boxShadow: 3 }}
        onClick={handleEntryOpen}
        color="primary"
        aria-label="openEntry"
        className="symptomsEntry-openIcon"
      >
        <img className="symptoms__icon" src={VirusIcon} alt="Symptoms" />
      </Fab>
      <div className="symptomsEntry">
        <Dialog
          //sx={{ borderColor: "var(--primary-light)", borderRadius: 3 }}
          open={openEntry}
          onClose={handleEntryClose}
          aria-labelledby="diary-entry-title"
          aria-describedby="diary-entry-description"
        >
          <DialogTitle
            id="diary-entry-dialog-title"
            className="header-diaryEntry-dialog"
          >
            <img className="diaryEntry__icon" src={VirusIcon} alt="Diary" />
            Diary Entry
          </DialogTitle>
          <DialogContent dividers>
            <Box className="STATUS__box">
              <TableContainer>
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
                        sx={{ borderColor: "var(--primary-light)" }}
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
              <SymptomsTable />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              className="diaryEntry-cancel-button"
              onClick={handleEntryClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default SymptomEntry;
