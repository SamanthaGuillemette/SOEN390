import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from '@mui/material/TablePagination';
import Box from "@mui/material/Box";
import HealingIcon from '@mui/icons-material/Healing';
import Paper from "@material-ui/core/Paper";
import "./../PatientList/PatientList.css";

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

function createData(doctorName, numOfPatients) {
  return {doctorName, numOfPatients};
}

const rows = [
  createData('Allyson Richards', "4/10"),
  createData('Charles Ludwig', "3/10"),
];

function DoctorList() {
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
        <HealingIcon className="patients-icon"></HealingIcon>
       Doctor List
     </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="header" sx={{borderColor: "rgb(148, 155, 226, 0.5)"}}>Doctor Name</TableCell>
            <TableCell className="header" sx={{borderColor: "rgb(148, 155, 226, 0.5)"}} align="right">patient number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell className="data" sx={{borderColor: "rgb(139, 195, 235, 0.5)"}}>
                {row.doctorName}
              </TableCell>
              <TableCell className="data" sx={{borderColor: "rgb(139, 195, 235, 0.5)"}} align="right">{row.numOfPatients}</TableCell>
            </TableRow>
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

export default DoctorList;
