/**
 * @fileoverview This component takes care of the Dashboard function.
 *
 */
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getPatients } from "../../backend/firebasePatientUtilities";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { Link } from "react-router-dom";

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
    <TableContainer
      sx={{
        bgcolor: "var(--background-main)",
        overflow: "auto",
        maxHeight: "35vh",
        "& ul": { padding: 0 },
        borderRadius: "20px",
      }}
      subheader={<li />}
    >
      <Typography
        data-testid="patientlist"
        textAlign="center"
        variant="h6"
        sx={{
          color: "var(--text-primary)",
          borderColor: "transparent",
          mt: 2,
          mb: 2,
        }}
      >
        Flagged Patient's List
      </Typography>
      <Table>
        {/* While here is the implementation*/}
        <TableBody>
          {patientList != null
            ? patientList.map((row) => (
                <TableRow key={row.email}>
                  <TableCell
                    sx={{ borderColor: "transparent" }}
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {/*Added the link to the table name */}
                    <Link
                      className="PATIENT__table__name"
                      to={`/patientprofile/${row.email}`}
                    >
                      {`${row.firstName} ${row.lastName}`}
                    </Link>
                    {/* getting the patient name */}
                  </TableCell>
                  <TableCell
                    sx={{ borderColor: "transparent" }}
                    component="th"
                    scope="row"
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
                    {/* getting the patient name */}
                  </TableCell>
                </TableRow>
              ))
            : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FlaggedPatients;
