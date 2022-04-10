/**
 * @fileoverview This class contains the component for updating a client's status
 */

import "./UpdateStatus.css";
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
 * Renders function to update a client's status'
 * @returns UpdateStatus function
 */
function UpdateStatus() {
  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector((state) => state.auth.userEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);
  const statusRef = collection(clientDoc, "Status");
  const q = query(statusRef, orderBy("timestamp", "desc"), limit(1));
  const [lastStatus, setLastStatus] = useState("");

  useEffect(() => {
    onSnapshot(q, (doc) => {
      setLastStatus(
        doc.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box className="Update-Status__box">
        <TableContainer>
          <StatusModal></StatusModal>
          <Typography
            className="Update-Status__title"
            align="center"
            sx={{ mt: 1 }}
            style={{ paddingBottom: 8 }}
          >
            STATUS
          </Typography>
          {/* Table for displaying date, temperature and weight */}
          <Table sx={{ width: 340 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="Update-Status__header"
                  sx={{ borderColor: "var(--primary-light)" }}
                  align="left"
                >
                  Date
                </TableCell>
                <TableCell
                  className="Update-Status__header"
                  sx={{ borderColor: "var(--primary-light)" }}
                  align="center"
                >
                  Temperature
                </TableCell>
                <TableCell
                  className="Update-Status__header"
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
                  {lastStatus.length > 0 &&
                  lastStatus[0].data.timestamp !== null
                    ? lastStatus[0].data.timestamp.toDate().toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell
                  className="Update-Status__data"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="center"
                >
                  {lastStatus.length > 0
                    ? lastStatus[0].data.temperature
                    : "N/A"}
                </TableCell>
                <TableCell
                  className="Update-Status__data"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="right"
                >
                  {lastStatus.length > 0 ? lastStatus[0].data.weight : "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* Collapsible Symptoms Table */}
        <SymptomsTable lastStatus={lastStatus} />
      </Box>
    </Grid>
  );
}

export default UpdateStatus;
