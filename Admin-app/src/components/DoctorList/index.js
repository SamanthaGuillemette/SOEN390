import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import HealingIcon from '@mui/icons-material/Healing';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { makeStyles } from "@material-ui/core/styles";
import TableHead from '@mui/material/TableHead';
import "./../PatientList/PatientList.css";

const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)",
    color: "var(--text-inactive)",
    borderRadius: "10px",
  },
  color: {
    color: "var(--text-inactive)"
  },
  select: {
    "&:after": {
      borderBottomColor: "var(--text-inactive)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--text-inactive)",
    },
  },
});

function createData(doctorName, numOfPatients) {
  return {doctorName, numOfPatients};
}

const rows = [
  createData('Allyson Richards', "4/10"),
  createData('Charles Ludwig', "3/10"),
];

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}

function DoctorList() {
  const classes = dropdownStyle();
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
    <TableContainer data-testid="table-container1" className="patient-doctor-list">
      <Box className="label">
        <HealingIcon data-testid = "health-icon" className="patients-icon"></HealingIcon>
       Doctor List
     </Box>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell className="header" sx={{borderColor: "var(--secondary-light)"}}>Doctor Name</TableCell>
            <TableCell className="header" sx={{borderColor: "var(--secondary-light)"}} align="right">patient number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell className="data" sx={{borderColor: "var(--primary-light)"}} component="th" scope="row">
                {row.doctorName}
              </TableCell>
              <TableCell className="data" sx={{borderColor: "var(--primary-light)"}} style={{ width: 160 }} align="right">
                {row.numOfPatients}
              </TableCell>
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
              rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              className={classes.select}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                MenuProps: {
                  classes: { paper: classes.paper },
                  sx: {
                    "&& .Mui-selected": {
                      backgroundColor: "var(--background-secondary)"
                    }
                  },
                }
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default DoctorList;