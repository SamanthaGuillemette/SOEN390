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
import { doc, collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useEffect, useState} from "react";

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
  const q = query(statusRef, orderBy("timestamp", 'desc'), limit(1));
  const [clientInfo, setClientInfo] = useState("");

  useEffect(() => {
    onSnapshot(q, (doc) => {
      setClientInfo(doc.docs.map(doc=> ({
          data: doc.data(),
      })))
    })
  }, )

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <Box className="STATUS__box">
      <TableContainer>
        <StatusModal></StatusModal>
        <Typography className="updateStatus-label" align="center" sx={{mt: 1}} style={{ paddingBottom: 8 }}>
          STATUS
        </Typography>
        {/* Table for displaying date, temperature and weight */}
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
                  {}
                </TableCell>
              <TableCell
                  className="data"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="center"
                >
                  {}
                </TableCell>
                <TableCell
                    className="data"
                    sx={{ borderColor: "var(--secondary-light)" }}
                    align="right"
                  >
                    {}
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
