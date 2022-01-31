import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Avatar from '@material-ui/core/Avatar';
import "./Doctor-List.css"

function createData(doctor_name, patient_num) {
  return { doctor_name, patient_num };
}

const rows = [
  createData("Allyson Richards", "4/10"),
  createData("Charles Ludwig", "3/10"),
  /*createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356)*/
];

export default function BasicTable() {
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [noOfPages] = React.useState(Math.ceil(rows.length / itemsPerPage));

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <TableContainer>
      <Table className="doctor-table">
        <TableHead>
          <TableRow>
            <TableCell className="doctor-list-heading">Doctor</TableCell>
            <TableCell></TableCell>
            <TableCell className="doctor-list-heading" align="right">Patient No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell><Avatar></Avatar></TableCell>
              <TableCell className="doctor-data" component="th" scope="row">
                {row.doctor_name}
              </TableCell>
              <TableCell className="doctor-data" align="right">
                {row.patient_num}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          size="small"
          showFirstButton
          showLastButton
        />
      </Table>
    </TableContainer>
  );
}