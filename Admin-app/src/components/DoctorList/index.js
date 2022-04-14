/**
 * @fileoverview This component takes care of the DoctorList function.
 *
 */
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import HealingIcon from "@mui/icons-material/Healing";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@mui/material/TableHead";
import { useEffect, useState } from "react";
import {
  getDoctors,
  patientLimit,
} from "../../backend/firebaseDoctorUtilities";

// adding styling
const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // giving background color to dropdown
    color: "var(--text-inactive) !important", // color of text in the dropdown
    borderRadius: "10px",
  },
  color: {
    color: "var(--text-inactive) !important", // color of text in pasgination
  },
  select: {
    "&:after": {
      borderBottomColor: "var(--text-inactive) !important",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--text-inactive) !important", // color of pagination button
    },
  },
});

/**
 * This component is used to create data using the doctorName and numOfPatients.
 *
 * @param  {} doctorName
 * @param  {} numOfPatients
 */
function createData(doctorName, numOfPatients) {
  return { doctorName, numOfPatients };
}

/**
 * This component is what allows the DoctorList feature to be displayed. Below are many consts and
 * useEffect hooks that communicate with the database in order to recieve or send information.
 *
 * @returns {JSX.Element}
 */
function DoctorList() {
  const classes = dropdownStyle(); // adding styling
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
        const size = doc.treats ? Object.keys(doc.treats).length : 0;
        results.push(
          createData(
            `${doc.firstName} ${doc.lastName}`,
            `${size}/${patientLimit}`
          )
        );
      });
      setDoctorsList(results);
    });
  }, []);

  return (
    // Creating table
    <TableContainer data-testid="table-container1" className="DOC__table">
      <Box className="DOC__table__label">
        <HealingIcon
          data-testid="health-icon"
          className="DOC__table__icon"
        ></HealingIcon>
        Doctor List
      </Box>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {" "}
            {/* adding table header */}
            <TableCell
              className="DOC__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
            >
              Doctor Name
            </TableCell>
            <TableCell
              className="DOC__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              patient number
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* adding rows in table */}
          {doctorsList &&
            (rowsPerPage > 0
              ? doctorsList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ) // calculating how many items to display per page
              : doctorsList
            ).map((row) => (
              // getting the data of each row
              <TableRow key={row.name}>
                <TableCell
                  className="DOC__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  component="th"
                  scope="row"
                >
                  {row.doctorName} {/* getting the doctor name */}
                </TableCell>
                <TableCell
                  className="DOC__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.numOfPatients} {/* getting the number of patients */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {doctorsList && (
        <TablePagination // adding pagination
          classes={{
            root: classes.color,
          }}
          rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]} // displaying options 5, 10, or ALL
          component="div"
          count={doctorsList.length} // setting how many rows there are in total
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

export default DoctorList;
