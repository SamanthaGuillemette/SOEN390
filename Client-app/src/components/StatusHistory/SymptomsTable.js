/**
 * @fileoverview This class takes care of the symptoms table component.
 */

import "../UpdateStatus/UpdateStatus.css";
import "./StatusHistory.css";
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
import { useState } from "react";

/**
 * Renders the symptoms table function
 * @returns SymptomsTable function
 */
function SymptomsTable(prop) {
  const row = prop.row;
  const [open, setOpen] = useState(false);

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table sx={{ width: 310 }} aria-label="spanning table">
        <TableBody>
          <TableRow>
            <TableCell
              className="Status__symptoms__header"
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
                <Box className="Status__symptoms-box">
                  {/* Collapsible symptoms table */}
                  <Table size="small" aria-label="symptoms">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          className="Status__symptoms__header"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          style={{ width: 120 }}
                          align="left"
                        >
                          Fever
                        </TableCell>
                        <TableCell
                          className="Status__symptoms__data"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="right"
                        >
                          {row.Fever}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Status__symptoms__header"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="left"
                        >
                          Sore Throat
                        </TableCell>
                        <TableCell
                          className="Status__symptoms__data"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="right"
                        >
                          {row.SoreThroat}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Status__symptoms__header"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="left"
                        >
                          Cough
                        </TableCell>
                        <TableCell
                          className="Status__symptoms__data"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="right"
                        >
                          {row.Cough}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Status__symptoms__header"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="left"
                        >
                          Runny Nose
                        </TableCell>
                        <TableCell
                          className="Status__symptoms__data"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="right"
                        >
                          {row.RunnyNose}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Status__symptoms__header"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="left"
                        >
                          Muscle Ache
                        </TableCell>
                        <TableCell
                          className="Status__symptoms__data"
                          sx={{ borderColor: "var(--secondary-light)" }}
                          align="right"
                        >
                          {row.MuscleAche}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Status__symptoms__header"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="left"
                        >
                          Smell Loss
                        </TableCell>
                        <TableCell
                          className="Status__symptoms__data"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="right"
                        >
                          {row.SmellLoss}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="Status__symptoms__header"
                          sx={{ borderColor: "transparent" }}
                          align="left"
                        >
                          Taste Loss
                        </TableCell>
                        <TableCell
                          className="Status__symptoms__data"
                          sx={{ borderColor: "transparent" }}
                          align="right"
                        >
                          {row ? row.TasteLoss : "N/A"}
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
