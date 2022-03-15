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
import { useEffect, useState } from "react";
import { getDoctors, patientLimit } from "../../backend/firebaseDoctorUtilities";

// Styling the list
const dropdownStyle = makeStyles({ 
  paper: {
    background: "var(--background-main)", // background color
    color: "var(--text-inactive)", // text color of pagination dropdown
    borderRadius: "10px", // making corners rounded
  },
  color: {
    color: "var(--text-inactive)" // pagination text color
  },
  select: {
    "&:after": {
      borderBottomColor: "var(--text-inactive)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--text-inactive)", // pagination button color
    },
  },
});

// function to create data
function createData(doctorName, numOfPatients) {
  return {doctorName, numOfPatients};
}

// function to create pagination
function TablePaginationActions(props) {
  const theme = useTheme(); // adding styling
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1); // changing page back
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1); // changing to next page
  };

  return (
    // making box for paignation
    <Box sx={{ flexShrink: 0, ml: 2.5 }}> 
      <IconButton
        onClick={handleBackButtonClick} // change on click
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick} // change on click
        disabled={page >= Math.ceil(count / rowsPerPage) - 1} // calculating the number of pages
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}



function DoctorList() {
  const classes = dropdownStyle(); // adding styling
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [doctorsList, setDoctorsList] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // creating new page
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // setting the page with data
    setPage(0);
  };

  useEffect(() => {
    getDoctors().then((data) => {
      let results = [];
      data.forEach((doc) => {
        const size = doc.treats? Object.keys(doc.treats).length : 0;
        results.push(createData(doc.name, `${size}/${patientLimit}`));
      });
      setDoctorsList(results);
    });
  }, []);
  


  return (
    // Creating table
    <TableContainer data-testid="table-container1" className="DOC__table">
      <Box className="DOC__table__label">
        <HealingIcon data-testid = "health-icon" className="DOC__table__icon"></HealingIcon>
       Doctor List
     </Box>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow> {/* adding table header */}
            <TableCell className="DOC__table__header" sx={{borderColor: "var(--secondary-light)"}}>Doctor Name</TableCell> 
            <TableCell className="DOC__table__header" sx={{borderColor: "var(--secondary-light)"}} align="right">patient number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* adding rows in table */}
          {doctorsList && (rowsPerPage > 0
            ? doctorsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // calculating how many items to display per page
            : doctorsList
          ).map((row) => (
            // getting the data of each row
            <TableRow key={row.name}>
              <TableCell className="DOC__table__data" sx={{borderColor: "var(--primary-light)"}} component="th" scope="row">
                {row.doctorName} {/* getting the doctor name */}
              </TableCell>
              <TableCell className="DOC__table__data" sx={{borderColor: "var(--primary-light)"}} style={{ width: 160 }} align="right">
                {row.numOfPatients} {/* getting the number of patients */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
          {doctorsList && (            
            <TablePagination // adding table pagination
              sx={{borderColor: "transparent"}}
              classes={{
                root: classes.color
              }}
              rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]} // adding options dropdown pagination to choose from
              colSpan={3}
              count={doctorsList.length} // getting how many rows there are in total
              rowsPerPage={rowsPerPage} // how many to display per page
              page={page} // how many pages
              className={classes.select} // adding design
              SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              MenuProps: {
                  classes: { paper: classes.paper },
                  sx: {
                    "&& .Mui-selected": {
                      backgroundColor: "var(--background-secondary)" // changing background color of selected pagination
                    }
                  },
                }
              }}
              onPageChange={handleChangePage} // handling page change
              onRowsPerPageChange={handleChangeRowsPerPage} // handling how many rows to display per page
              ActionsComponent={TablePaginationActions}
            />
          )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default DoctorList;