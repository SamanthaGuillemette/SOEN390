import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import FlagIcon from "@mui/icons-material/Flag";
import "./PatientList.css";
import { useEffect, useState } from "react";
import { getPatients } from "../../backend/firebasePatientUtilities";

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
function createData(
  patientname,
  id,
  status,
  appointment,
  doctor,
  priority,
  temperature,
  weight,
  height
) {
  return {
    patientname,
    id,
    status,
    appointment,
    doctor,
    priority,
    symptoms: [
      {
        temperature,
        weight,
        height,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false); // setting the open condition to be false
  const data = localStorage.getItem('priorityFlag') // getting the priority flag

  return (
    <React.Fragment>
      <TableRow>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "var(--text-inactive)" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} {/* changing icon to up or down based on open or not */}
          </IconButton>
        </TableCell>
        {/* Displaying row of data */}
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="data" component="th" scope="row" align="center">
        {row.patientname}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="data" align="center" >
          {row.id}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="data" align="center" >
          {row.status}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="data" align="center" >
          {row.appointment}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="data" align="center">
          {row.doctor}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="data" align="center">
          {row.priority}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{ borderColor: "var(--background-secondary)" }}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          {/* Adding collapsible table */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* Adding Table Label */}
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                color="var(--text-inactive)"
              >
                Symptoms
              </Typography>
              <Table
                className="symptoms-table"
                size="small"
                aria-label="purchases"
              >
              {/* Start of Table headers */}
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ borderColor: "var(--primary-light)" }}
                      className="symptoms-data"
                    >
                      Temperature
                    </TableCell>
                    <TableCell
                      sx={{ borderColor: "var(--primary-light)" }}
                      className="symptoms-data"
                    >
                      Weight
                    </TableCell>
                    <TableCell
                      sx={{ borderColor: "var(--primary-light)" }}
                      className="symptoms-data"
                      align="right"
                    >
                      Height
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* End of Table Headers */}
                {/* Adding the body of collapsible table */}
                <TableBody>
                  {/* Displaying each row */}
                  {row.symptoms.map((symptomsRow) => (
                    <TableRow key={symptomsRow.date}>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="symptoms-data"
                        component="th"
                        scope="row"
                      >
                        {symptomsRow.temperature}
                      </TableCell>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="symptoms-data"
                      >
                        {symptomsRow.weight}
                      </TableCell>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="symptoms-data"
                        align="right"
                      >
                        {symptomsRow.height}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function PatientList() {
  const classes = dropdownStyle(); // adding styling
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [patientsList, setPatientsList] = useState(null);

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
                doc.status === "POSITIVE" ? "label-positive" : "label-negative"
              }
            >
              {doc.status}
            </span>,
            doc.upcomingAppointment,
            doc.assignedDoctor,
            <FlagIcon
              className={
                doc.flaggedPriority === "0"
                  ? "priority-flag"
                  : "priority-flag clicked"
              }
            ></FlagIcon>,
            doc.temperature + "°C",
            doc.weight + " lbs",
            doc.heightFeet + "' " + doc.heightInches + '"'
          )
        );
      });
      setPatientsList(results);
    });
  }, []);

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
        <HealthAndSafetyIcon className="patients-icon"></HealthAndSafetyIcon>
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
              align="center"
            >
              Patient Name
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="header"
              align="center"
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
              align="center"
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
            ).map((row) => <Row key={row.id} row={row}></Row>)}
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