import * as React from "react";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PatientPage from "./PatientPage.css";

function createData(name, id, status, appointment, doctor, priority, temperature, weight, height) {
  return {
    name,
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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="patient-name">{row.name}</TableCell>
        <TableCell align="right" className="data">{row.id}</TableCell>
        <TableCell align="right" className="data">{row.status}</TableCell>
        <TableCell align="right" className="data">{row.appointment}</TableCell>
        <TableCell align="right" className="data">{row.doctor}</TableCell>
        <TableCell align="right" className="data">{row.priority}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">Symptoms</Typography>
              <Table className="symptoms-table" size="small">
                  <TableRow>
                    <TableCell className="symptoms-data">Temperature</TableCell>
                    <TableCell className="symptoms-data">Weight</TableCell>
                    <TableCell className="symptoms-data">Height</TableCell>
                  </TableRow>
                  {row.symptoms.map((symptomsRow) => (
                    <TableRow>
                      <TableCell className="symptoms-data">{symptomsRow.temperature}</TableCell>
                      <TableCell className="symptoms-data">{symptomsRow.weight}</TableCell>
                      <TableCell className="symptoms-data">{symptomsRow.height}</TableCell>
                    </TableRow>
                  ))}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Jane Doe", 1476, 
  <span class="label-positive">positive</span>, "23/05/22", "Allyson Richards", <label><input type="checkbox"/></label>, "90°C", "150 lbs", "5'9"),
  createData("John Smith", 1009,
  <span class="label-negative">negative</span>, "05/02/22", "Charles Ludwig", <label><input type="checkbox"/></label>, "65°C", "120lbs", "5'5"),
];

function PatientList() {
  return (
    <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
    <Grid item xs={8} lg={12}></Grid>
    <div className="title">Patient List</div>
    <TableContainer>
      <Table className="patient-list">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="header">Patient Name</TableCell>
            <TableCell align="right" className="header">ID</TableCell>
            <TableCell align="right" className="header">Status</TableCell>
            <TableCell align="right" className="header">Upcoming Appointment</TableCell>
            <TableCell align="right" className="header">Assigned Doctor</TableCell>
            <TableCell align="right" className="header">Flagged Priority</TableCell>
          </TableRow>
        </TableHead>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
      </Table>
    </TableContainer>
    </Grid>
  );
}

export default PatientList;