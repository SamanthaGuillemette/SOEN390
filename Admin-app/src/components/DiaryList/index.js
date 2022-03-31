/**
 * @fileoverview This component takes care of the DiaryList function.
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
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";
import TableHead from "@mui/material/TableHead";
import { useEffect, useState } from "react";
import {
  getPatient,
  getDiaryEntries,
} from "../../backend/firebasePatientUtilities";
import { useParams } from "react-router-dom";
import NoteIcon from "../../assets/note.svg";

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
 * This component is used to create data using the diaryDate, contactFullName, contactPhoneNumber, contactEmail and contactLocation.
 *
 * @param  {} diaryDate
 * @param  {} contactFullName
 * @param  {} contactPhoneNumber
 * @param  {} contactEmail
 * @param  {} contactLocation
 */
function createData(
  diaryDate,
  contactFullName,
  contactPhoneNumber,
  contactEmail,
  contactLocation
) {
  return {
    diaryDate,
    contactFullName,
    contactPhoneNumber,
    contactEmail,
    contactLocation,
  };
}

/**
 * This function is used to create pagination
 * @param  {} props
 */
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
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick} // change on click
        disabled={page >= Math.ceil(count / rowsPerPage) - 1} // calculating the number of pages
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
}

/**
 * This component is what allows the DiaryList feature to be displayed. Below are many consts and
 * useEffect hooks that communicate with the database in order to recieve or send information.
 *
 * @returns {JSX.Element}
 */
function DiaryList() {
  const classes = dropdownStyle(); // adding styling
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { key } = useParams();
  const [patientInfo, setPatientInfo] = useState(null);
  const [patientDiaryEntries, setPatientDiaryEntries] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // creating new page
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // setting the page with data
    setPage(0);
  };

  useEffect(() => {
    getPatient(key)
      .then((data) => {
        setPatientInfo(data);
        getDiaryEntries(key, true).then((diaryEntries) => {
          diaryEntries &&
            setPatientDiaryEntries(
              diaryEntries.map((diaryEntry) =>
                createData(
                  diaryEntry?.timestamp?.toDate()?.toLocaleString() || "",
                  diaryEntry.contactFullName || "",
                  diaryEntry.contactPhoneNumber || "",
                  diaryEntry.contactEmail || "",
                  diaryEntry.contactLocation || ""
                )
              )
            );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [key]);

  return (
    // Creating table
    <TableContainer data-testid="table-container1" className="DIARY__table">
      <Box className="DIARY__table__label">
        <NoteIcon
          data-testid="note-icon"
          className="DIARY__table__icon"
        ></NoteIcon>
        Diary List
      </Box>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {/* adding table header */}
            <TableCell
              className="DIARY__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
            >
              Date
            </TableCell>
            <TableCell
              className="DIARY__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Contact Full Name
            </TableCell>
            <TableCell
              className="DIARY__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Contact Phone Number
            </TableCell>
            <TableCell
              className="DIARY__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Contact Email
            </TableCell>
            <TableCell
              className="DIARY__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Contact Location
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* adding rows in table */}
          {patientDiaryEntries &&
            (rowsPerPage > 0
              ? patientDiaryEntries.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ) // calculating how many items to display per page
              : patientDiaryEntries
            ).map((row) => (
              // getting the data of each row
              <TableRow key={row.key}>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  component="th"
                  scope="row"
                >
                  {row.diaryDate} {/* getting the diary entry date */}
                </TableCell>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.contactFullName} {/* getting the contact full name */}
                </TableCell>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.contactPhoneNumber}
                  {/* getting the contact phone number*/}
                </TableCell>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.contactEmail} {/* getting the contact email */}
                </TableCell>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.contactLocation} {/* getting the contact location */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {patientDiaryEntries && (
              <TablePagination // adding table pagination
                sx={{ borderColor: "transparent" }}
                classes={{
                  root: classes.color,
                }}
                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]} // adding options dropdown pagination to choose from
                colSpan={3}
                count={patientDiaryEntries.length} // getting how many rows there are in total
                rowsPerPage={rowsPerPage} // how many to display per page
                page={page} // how many pages
                className={classes.select} // adding design
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  MenuProps: {
                    classes: { paper: classes.paper },
                    sx: {
                      "&& .Mui-selected": {
                        backgroundColor: "var(--background-secondary)", // changing background color of selected pagination
                      },
                    },
                  },
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

export default DiaryList;
