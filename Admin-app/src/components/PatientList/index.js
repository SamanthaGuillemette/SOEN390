/**
 * @fileoverview This component takes care of the PatientList function.
 *
 */
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { makeStyles } from "@material-ui/core/styles";
import FlagIcon from "@mui/icons-material/Flag";
import { useEffect, useState } from "react";
import { getPatients } from "../../backend/firebasePatientUtilities";
import { getDoctors } from "../../backend/firebaseDoctorUtilities";
import SingleRow from "./SingleRow";
import "./Patients-Table.css";

// adding styling
const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // giving background color to dropdown
    color: "var(--text-inactive) !important", // color of text in the dropdown
    borderRadius: "10px",
  },
  color: {
    color: "var(--text-inactive) !important", // color of text in pasgination
  },
  select: {
    "&:after": {
      borderBottomColor: "var(--text-inactive) !important",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--text-inactive) !important", // color of pagination button
    },
  },
});

// function to create data
function createData(
  patientname,
  email,
  status,
  doctor,
  priority,
  statusReview,
  birthday,
  address
) {
  return {
    patientname,
    email,
    status,
    doctor,
    priority,
    statusReview,
    personalInfo: [
      {
        birthday,
        address,
      },
    ],
  };
}

function PatientList() {
  const classes = dropdownStyle(); // adding styling
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patientsList, setPatientsList] = useState(null);
  const [doctorsList, setDoctorsList] = useState(null);

  useEffect(() => {
    getDoctors().then((data) => {
      let results = [];
      data.forEach((doc) => {
        results[doc.email] = doc;
      });
      setDoctorsList(results);
    });
  }, []);

  useEffect(() => {
    getPatients().then((data) => {
      let results = [];
      data.forEach((doc) => {
        results.push(
          createData(
            <Link
              className="PATIENT__table__name"
              to={`/patientprofile/${doc.email}`}
            >
              {`${doc.firstName} ${doc.lastName}`}
            </Link>,
            doc.email,
            <span
              className={
                doc.status == null
                  ? "PATIENT__label-unconfirmed"
                  : doc.status === "POSITIVE"
                  ? "PATIENT__label-positive"
                  : doc.status === "NEGATIVE"
                  ? "PATIENT__label-negative"
                  : "PATIENT__label-unconfirmed"
              }
            >
              {doc.status ? doc.status : "UNCONFIRMED"}
            </span>,
            doc.assignedDoctor &&
              doctorsList &&
              doctorsList[doc.assignedDoctor] &&
              doctorsList[doc.assignedDoctor].firstName &&
              doctorsList[doc.assignedDoctor].lastName &&
              `${doctorsList[doc.assignedDoctor].firstName} ${
                doctorsList[doc.assignedDoctor].lastName
              }`,
            <FlagIcon
              className={
                doc.flaggedPriority != null && doc.flaggedPriority === "1"
                  ? "PATIENT__priority-flag clicked"
                  : "PATIENT__priority-flag"
              }
            ></FlagIcon>,
            doc.statusReview,
            doc.dob,
            `${doc.address}, ${doc.city}, ${doc.province}, ${doc.postalCode}`
          )
        );
      });
      setPatientsList(results);
    });
  }, [doctorsList]);

  /**
   * Function that handles changing the page of the patients
   * @param  {} event
   * @param  {} newPage
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Function that handles changing the row per page
   * @param  {} event
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className="PATIENT__table">
      <Box className="PATIENT__table__label">
        {" "}
        {/* Creating label*/}
        <HealthAndSafetyIcon className="PATIENT__table__icon"></HealthAndSafetyIcon>
        Patient List
      </Box>
      <Table aria-label="collapsible table">
        {/* Start of table headers */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderColor: "var(--background-secondary)" }} />
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="PATIENT__table__header"
              align="left"
            >
              Patient Name
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="PATIENT__table__header"
              align="left"
            >
              Email
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="PATIENT__table__header"
              align="center"
            >
              status
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="PATIENT__table__header"
              align="left"
            >
              Assigned Doctor
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="PATIENT__table__header"
              align="center"
            >
              Flagged Priority
            </TableCell>
          </TableRow>
        </TableHead>
        {/* End of table headers */}
        <TableBody>
          {/* Calculating how many pages to show per page */}
          {patientsList &&
            (rowsPerPage > 0
              ? patientsList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : patientsList
            ).map((row) => <SingleRow key={row.id} row={row} />)}
        </TableBody>
      </Table>
      {patientsList && (
        <TablePagination // adding pagination
          classes={{
            root: classes.color,
          }}
          rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]} // displaying options 5, 10, or ALL
          component="div"
          count={patientsList.length} // setting how many rows there are in total
          rowsPerPage={rowsPerPage} // setting the rows per page
          page={page} // setting the page
          onPageChange={handleChangePage} // changing page
          onRowsPerPageChange={handleChangeRowsPerPage} // changing rows on page
          className={classes.select} // styling
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            MenuProps: {
              classes: { paper: classes.paper },
              sx: {
                "&& .Mui-selected": {
                  backgroundColor: "var(--background-secondary)",
                },
              },
            },
          }}
        />
      )}
    </TableContainer>
  );
}

export default PatientList;
