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
import TablePagination from '@mui/material/TablePagination';
import {Link } from "react-router-dom";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { makeStyles } from "@material-ui/core/styles";
import "./PatientList.css";

const useStyles = makeStyles({
  table: {
    minWidth: 500
  },
  paper: {
    background: "inherit",
    color: "#767676"
  },
  color: {
    color: "#767676"
  }
});

function createData(patientname, id, status, appointment, doctor, priority, temperature, weight, height) {
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
        height
      }
    ]
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{borderColor: "#1e1e1e"}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx = {{color: "#767676"}}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{borderColor: "#1e1e1e"}} className="data" component="th" scope="row">
          {row.patientname}
        </TableCell>
        <TableCell sx={{borderColor: "#1e1e1e"}} className="data" align="right">{row.id}</TableCell>
        <TableCell sx={{borderColor: "#1e1e1e"}} className="data" align="right">{row.status}</TableCell>
        <TableCell sx={{borderColor: "#1e1e1e"}} className="data" align="right">{row.appointment}</TableCell>
        <TableCell sx={{borderColor: "#1e1e1e"}} className="data" align="right">{row.doctor}</TableCell>
        <TableCell sx={{borderColor: "#1e1e1e"}} className="data" align="right">{row.priority}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{borderColor: "#1e1e1e"}} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1}}>
              <Typography variant="h6" gutterBottom component="div" color="#767676">
                Symptoms
              </Typography>
              <Table className="symptoms-table" size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{borderColor: "#171717"}} className="symptoms-data">Temperature</TableCell>
                    <TableCell sx={{borderColor: "#171717"}} className="symptoms-data">Weight</TableCell>
                    <TableCell sx={{borderColor: "#171717"}} className="symptoms-data" align="right">Height</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.symptoms.map((symptomsRow) => (
                    <TableRow key={symptomsRow.date}>
                      <TableCell sx={{borderColor: "transparent"}} className="symptoms-data" component="th" scope="row">
                        {symptomsRow.temperature}
                      </TableCell>
                      <TableCell sx={{borderColor: "transparent"}} className="symptoms-data">{symptomsRow.weight}</TableCell>
                      <TableCell sx={{borderColor: "transparent"}} className="symptoms-data" align="right">{symptomsRow.height}</TableCell>
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

const rows = [
  createData(<Link className="data" to="/patientprofile">John Doe</Link>, 1476, 
  <span class="label-positive">positive</span>, "23/05/22", "Allyson Richards", <label><input type="checkbox"/></label>, "90°C", "150 lbs", "5'9"),
  createData("Jane Smith", 159,
  <span class="label-positive">positive</span>, "05/02/22", "Charles Ludwig", <label><input type="checkbox"/></label>, "65°C", "120lbs", "5'5"),
  createData("William Hill", 1666, 
  <span class="label-positive">positive</span>, "06/05/22", "Allyson Richards", <label><input type="checkbox"/></label>, "90°C", "150 lbs", "5'9"),
  createData("Maria Sánchez", 1200,
  <span class="label-negative">negative</span>, "06/02/22", "Charles Ludwig", <label><input type="checkbox"/></label>, "65°C", "120lbs", "5'5"),
  createData("Liam Hill", 233, 
  <span class="label-positive">positive</span>, "22/03/22", "Allyson Richards", <label><input type="checkbox"/></label>, "90°C", "150 lbs", "5'9"),
  createData("Connor Jackson", 2893,
  <span class="label-negative">negative</span>, "31/01/22", "Allyson Richards", <label><input type="checkbox"/></label>, "65°C", "120lbs", "5'5"),
  createData("Connor Jackson", 2896,
  <span class="label-negative">negative</span>, "01/02/22", "Charles Ludwig", <label><input type="checkbox"/></label>, "65°C", "120lbs", "5'5"),
];

function PatientList() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className="patient-doctor-list">
     <Box className="label">
       <HealthAndSafetyIcon className="patients-icon"></HealthAndSafetyIcon>
       Patient List
     </Box>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell sx={{borderColor: "#1e1e1e"}}/>
            <TableCell sx={{borderColor: "#1e1e1e"}} className="header">Patient Name
            </TableCell>
            <TableCell sx={{borderColor: "#1e1e1e"}} className="header" align="right">ID</TableCell>
            <TableCell sx={{borderColor: "#1e1e1e"}} className="header" align="right">status</TableCell>
            <TableCell sx={{borderColor: "#1e1e1e"}} className="header" align="right">Upcoming Appointment</TableCell>
            <TableCell sx={{borderColor: "#1e1e1e"}} className="header" align="right">Assigned Doctor</TableCell>
            <TableCell sx={{borderColor: "#1e1e1e"}} className="header" align="right">Flagged Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.id} row={row}></Row>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          classes={{
            root: classes.color
          }}
          rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            MenuProps: { classes: { paper: classes.paper } }
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage} 
      />
    </TableContainer>
  );
}

export default PatientList;