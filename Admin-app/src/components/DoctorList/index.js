import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader } from '@mui/material';
import Avatar from "@material-ui/core/Avatar";
import "./DoctorList.css";

const useStyles = makeStyles((theme) => ({
  color: {
    color: "white"
  }
}));

function createData(doctorname, numOfPatients) {
  return {doctorname, numOfPatients};
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
    <TableContainer component={Paper}>
      <Table className="doctor-table">
        <TableBody>
          <TableCell sx={{borderColor: "transparent"}} className="doctor-table-heading">Doctor</TableCell>
          <TableCell sx={{borderColor: "transparent"}} className="doctor-table-heading" align="right">Patient No.</TableCell>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.doctorname}>
              <TableCell sx={{borderColor: "transparent"}} className="doctor-data" component="th" scope="row">
              <CardHeader
              avatar={
              <Avatar src=""/>
              }
              title={row.doctorname}
              /></TableCell>
              <TableCell sx={{borderColor: "transparent"}} className="doctor-data" style={{ width: 160 }} align="right">{row.numOfPatients}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow> 
            <TablePagination
            sx={{borderColor: "transparent"}}
              classes={{
                root: classes.color
              }}
              backIconButtonProps={{ className: classes.color }}
              nextIconButtonProps={{ className: classes.color }} 
              rowsPerPageOptions={[5]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default DoctorList;