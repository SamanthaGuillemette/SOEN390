import "./StatusHistory.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
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

const style = {
  //position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",
  color: "var(--text-main)",
  backgroundColor: "var(--background-secondary)",
  boxShadow: "0px 0px 2px 2px var(--background-secondary)",
  p: 3,
  overflowY: "scroll",
  borderRadius: "20px",
  borderColor: "var(--primary-light)",
};

function SymptomEntry(prop) {
  const [openEntry, setOpenEntry] = useState(false);
  const row = prop.row;
  const handleEntryOpen = () => setOpenEntry(true);
  const handleEntryClose = () => setOpenEntry(false);

  return (
    <div sx={style}>
      <Fab
        sx={{ boxShadow: 3 }}
        onClick={handleEntryOpen}
        color="primary"
        aria-label="openEntry"
        className="status-entry-openIcon"
      >
        <img className="status__icon" src={VirusIcon} alt="Status" />
      </Fab>
      <div className="statusEntry">
        <Dialog
          //sx={{ borderColor: "var(--primary-light)", borderRadius: 3 }}
          open={openEntry}
          onClose={handleEntryClose}
          aria-labelledby="status-entry-title"
          aria-describedby="status-entry-description"
        >
          <DialogTitle
            id="status-entry-dialog-title"
            className="header-statusEntry-dialog"
          >
            <img className="statusEntry__icon" src={VirusIcon} alt="Status" />
            Status
          </DialogTitle>
          <DialogContent dividers>
            <Box className="STATUS__box">
              <TableContainer>
                {" "}
                {/* Table for displaying date, temperature and weight */}
                <Table sx={{ width: 310 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className="Status__header"
                        sx={{ borderColor: "var(--primary-light)" }}
                        align="left"
                      >
                        Date
                      </TableCell>
                      <TableCell
                        className="Status__header"
                        sx={{ borderColor: "var(--primary-light)" }}
                        align="center"
                      >
                        Temperature
                      </TableCell>
                      <TableCell
                        className="Status__header"
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
                        className="Update-Status__data"
                        sx={{ borderColor: "var(--secondary-light)" }}
                        align="left"
                      >
                        {row.Date}
                      </TableCell>
                      <TableCell
                        className="Update-Status__data"
                        sx={{ borderColor: "var(--secondary-light)" }}
                        align="center"
                      >
                        {row.Temperature}
                      </TableCell>
                      <TableCell
                        className="Update-Status__data"
                        sx={{ borderColor: "var(--secondary-light)" }}
                        align="right"
                      >
                        {row.Weight}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Collapsible Symptoms Table */}
              <SymptomsTable row={prop.row} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              className="statusEntry-cancel-button"
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
