/**
 * @fileoverview This component takes care of the Dashboard function.
 *
 */
import { useState, useEffect } from "react";
import { getPatients } from "../../backend/firebasePatientUtilities";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { Link } from "react-router-dom";
import TableHead from "@mui/material/TableHead";

/**
 * Main function which will render the dashboard
 */
const FlaggedPatients = () => {
  const [patientList, setPatientList] = useState(null);

  useEffect(() => {
    getPatients().then((data) => {
      let patients_array = [];
      data.forEach((patient) => {
        if (patient.flaggedPriority === "1") {
          patients_array.push(patient);
        }
      });
      setPatientList(patients_array);
    });
  }, []);

  return (
    // The following is the Patient List which appears on the dashboard. Here we have the styling.
    // Creating table
    <TableContainer
      data-testid="patientlist"
      className="FLAGGED-PATIENTS__table"
      sx={{ maxHeight: 382 }}
    >
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {" "}
            {/* adding table header */}
            <TableCell
              className="FLAGGED-PATIENTS__table__data"
              sx={{
                borderColor: "var(--background-secondary)",
                backgroundColor: "#3a3a3a",
              }}
            >
              Patient Name
            </TableCell>
            <TableCell
              className="FLAGGED-PATIENTS__table__data"
              sx={{
                borderColor: "var(--background-secondary)",
                backgroundColor: "#3a3a3a",
              }}
              align="right"
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* adding rows in table */}
          {patientList != null &&
            patientList.map((row) => (
              <TableRow key={row.email}>
                <TableCell
                  sx={{ borderColor: "var(--background-secondary)" }}
                  component="th"
                  scope="row"
                >
                  {/*Added the link to the table name */}
                  <Link
                    className="PATIENT__table__name"
                    to={`/patientprofile/${row.email}`}
                  >
                    {`${row.firstName} ${row.lastName}`}
                  </Link>
                </TableCell>
                <TableCell
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="right"
                >
                  <span
                    className={
                      row.status === "POSITIVE"
                        ? "PATIENT__label-positive"
                        : row.status === "NEGATIVE"
                        ? "PATIENT__label-negative"
                        : "PATIENT__label-unconfirmed"
                    }
                  >
                    {row.status ? row.status : "UNCONFIRMED"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlaggedPatients;
