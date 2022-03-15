import React from "react";
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
import "./PatientList.css";
import { useEffect, useState } from "react";
import { getPatients } from "../../backend/firebasePatientUtilities";
import { getDoctors } from "../../backend/firebaseDoctorUtilities";
import SingleRow from "./SingleRow";

// adding styling
const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // giving background color to dropdown
    color: "var(--text-inactive)", // color of text in the dropdown
    borderRadius: "10px",
  },
  color: {
    color: "var(--text-inactive)", // color of text in pasgination
  },
  select: {
    "&:after": {
      borderBottomColor: "var(--text-inactive)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--text-inactive)", // color of pagination button
    },
  },
});

// function to create data
function createData(patientname, id, status, appointment, doctor, priority, statusReview, temperature, weight, height) {
  return { patientname,id, status, appointment, doctor, priority, statusReview, symptoms: [
  {
        temperature,
        weight,
        height,
      },
    ],
  };
}

function PatientList() {
  const classes = dropdownStyle(); // adding styling
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [patientsList, setPatientsList] = useState(null);
  const [doctorsList, setDoctorsList] = useState(null);

  useEffect(() => {
    getDoctors().then((data) => {
      let results = [];
      data.forEach((doc) => {
        results[doc.id] = doc;
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
            <Link className="patient-name" to={`/patientprofile/${doc.id}`}>
              {doc.name}
            </Link>,
            doc.id,
            <span
              className={
                (doc.status === "POSITIVE") ? "label-positive" : (doc.status === "NEGATIVE") ? "label-negative" : "label-unconfirmed"
              }
            >
              {doc.status}
            </span>,
            doc.upcomingAppointment,
            doc.assignedDoctor && doctorsList && doctorsList[doc.assignedDoctor] && doctorsList[doc.assignedDoctor].name,
            <FlagIcon
              className={
                doc.flaggedPriority === "0"
                  ? "priority-flag"
                  : "priority-flag clicked"
              }
            ></FlagIcon>,
            doc.statusReview,
            doc.temperature + "°C",
            doc.weight + " lbs",
            doc.heightFeet + "' " + doc.heightInches + '"'
          )
        );
      });
      setPatientsList(results);
    });
  }, [doctorsList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className="patient-doctor-list">
      <Box className="label"> {/* Creating label*/}
        <HealthAndSafetyIcon className="patients-icon"/>
        Patient List
      </Box>
      <Table aria-label="collapsible table">
        {/* Start of table headers */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderColor: "var(--background-secondary)" }} />
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="header"
              align="left"
            >
              Patient Name
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="header"
              align="left"
            >
              ID
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="header"
              align="center"
            >
              status
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="header"
              align="center"
            >
              Upcoming Appointment
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="header"
              align="left"
            >
              Assigned Doctor
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="header"
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
            ).map((row) => <SingleRow key={row.id} row={row}/>)}
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