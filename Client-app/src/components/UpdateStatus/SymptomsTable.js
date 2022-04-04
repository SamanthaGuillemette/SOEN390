/**
 * @fileoverview This class takes care of the symptoms table component.
 */

import "./UpdateStatus.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { useState, useEffect } from "react";

/**
 * Renders the symptoms table function
 * @returns SymptomsTable function
 */
function SymptomsTable(props) {
  const [open, setOpen] = useState(false);
  const [lastStatus, setLastStatus] = useState("");

  useEffect(() => {
    props && props.lastStatus && setLastStatus(props.lastStatus);
  }, [props, props.lastStatus]);

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table sx={{ width: 350 }} aria-label="spanning table">
        <TableBody>
          <TableRow>
            <TableCell
              className="Update-Status__header"
              style={{ paddingBottom: 8, paddingTop: 0, paddingLeft: 40 }}
              align="center"
              sx={{ borderColor: "var(--background-secondary)" }}
            >
              <IconButton
                aria-label="expand row"
                size="small"
                style={{ color: "var(--primary-light)" }}
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              Symptoms
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
            ></TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              sx={{ borderColor: "var(--background-secondary)" }}
              colSpan={6}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box className="Update-Status__symptoms-box">
                  {/* Collapsible symptoms table */}
                  <Table size="small" aria-label="symptoms">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          className="Update-Status__header"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          style={{ width: 120 }}
                          align="left"
                        >
                          Fever
                        </TableCell>
                        <TableCell
                          className="Update-Status__data"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="right"
                        >
                          {lastStatus.length > 0
                            ? lastStatus[0].data.fever
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Update-Status__header"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="left"
                        >
                          Sore Throat
                        </TableCell>
                        <TableCell
                          className="Update-Status__data"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="right"
                        >
                          {lastStatus.length > 0
                            ? lastStatus[0].data.soreThroat
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Update-Status__header"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="left"
                        >
                          Cough
                        </TableCell>
                        <TableCell
                          className="Update-Status__data"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="right"
                        >
                          {lastStatus.length > 0
                            ? lastStatus[0].data.cough
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Update-Status__header"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="left"
                        >
                          Runny Nose
                        </TableCell>
                        <TableCell
                          className="Update-Status__data"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="right"
                        >
                          {lastStatus.length > 0
                            ? lastStatus[0].data.runnyNose
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Update-Status__header"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="left"
                        >
                          Muscle Ache
                        </TableCell>
                        <TableCell
                          className="Update-Status__data"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="right"
                        >
                          {lastStatus.length > 0
                            ? lastStatus[0].data.muscleAche
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Update-Status__header"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="left"
                        >
                          Smell Loss
                        </TableCell>
                        <TableCell
                          className="Update-Status__data"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="right"
                        >
                          {lastStatus.length > 0
                            ? lastStatus[0].data.smellLoss
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Update-Status__header"
                          sx={{ borderColor: "transparent" }}
                          align="left"
                        >
                          Taste Loss
                        </TableCell>
                        <TableCell
                          className="Update-Status__data"
                          sx={{ borderColor: "transparent" }}
                          align="right"
                        >
                          {lastStatus.length > 0
                            ? lastStatus[0].data.tasteLoss
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SymptomsTable;
