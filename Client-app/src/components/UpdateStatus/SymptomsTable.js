/**
 * @fileoverview This class takes care of the symptoms table component.
 */

import "./UpdateStatus.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useEffect, useState } from "react";

/**
 * Renders the symptoms table function
 * @returns SymptomsTable function
 */
function SymptomsTable() {
  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector((state) => state.auth.userEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);
  const statusRef = collection(clientDoc, "Status");
  const q = query(statusRef, orderBy("timestamp", "desc"), limit(1));
  const [clientInfo, setClientInfo] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    onSnapshot(q, (doc) => {
      setClientInfo(
        doc.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
  });

  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table sx={{ width: 350 }} aria-label="spanning table">
        <TableBody>
          <TableRow>
            <TableCell
              className="header"
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
                <Box className="updateStatus-symptomsBox">
                  {/* Collapsible symptoms table */}
                  <Table size="small" aria-label="symptoms">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          className="updateStatus-symptomsHeader"
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
                          {}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="updateStatus-symptomsHeader"
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
                          {}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="updateStatus-symptomsHeader"
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
                          {}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="updateStatus-symptomsHeader"
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
                          {}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="updateStatus-symptomsHeader"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="left"
                        >
                          Muscle Ache
                        </TableCell>
                        <TableCell
                          className="data"
                          sx={{ borderColor: "var(--primary-light)" }}
                          align="right"
                        >
                          {}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="updateStatus-symptomsHeader"
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
                          {}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className="updateStatus-symptomsHeader"
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
                          {}
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
