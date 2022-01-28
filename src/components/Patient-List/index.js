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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./Patient-List.css";
import TablePagination from '@mui/material/TablePagination';


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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="patient-name" component="th" scope="row">
          {row.patientname}
        </TableCell>
        <TableCell className="data" align="right">{row.id}</TableCell>
        <TableCell className="data" align="right">{row.status}</TableCell>
        <TableCell className="data" align="right">{row.appointment}</TableCell>
        <TableCell className="data" align="right">{row.doctor}</TableCell>
        <TableCell className="data" align="right">{row.priority}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1}}>
              <Typography variant="h6" gutterBottom component="div">
                Symptoms
              </Typography>
              <Table className="symptoms-table" size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="symptoms-data">Temperature</TableCell>
                    <TableCell className="symptoms-data">Weight</TableCell>
                    <TableCell className="symptoms-data" align="right">Height</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.symptoms.map((symptomsRow) => (
                    <TableRow key={symptomsRow.date}>
                      <TableCell className="symptoms-data" component="th" scope="row">
                        {symptomsRow.temperature}
                      </TableCell>
                      <TableCell className="symptoms-data">{symptomsRow.weight}</TableCell>
                      <TableCell className="symptoms-data" align="right">{symptomsRow.height}</TableCell>
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
  createData("Jane Doe", 1476, 
  <span class="label-positive">positive</span>, "23/05/22", "Allyson Richards", <label><input type="checkbox"/></label>, "90°C", "150 lbs", "5'9"),
  createData("John Smith", 1009,
  <span class="label-negative">negative</span>, "05/02/22", "Charles Ludwig", <label><input type="checkbox"/></label>, "65°C", "120lbs", "5'5"),
];

function CollapsibleTable() {
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
    <TableContainer className="patient-list" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="header">Patient Name</TableCell>
            <TableCell className="header" align="right">ID</TableCell>
            <TableCell className="header" align="right">status</TableCell>
            <TableCell className="header" align="right">Upcoming Appointment</TableCell>
            <TableCell className="header" align="right">Assigned Doctor</TableCell>
            <TableCell className="header" align="right">Flagged Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.patientname} row={row}></Row>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>
  );
}

export default CollapsibleTable;