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
import { getDiary } from "../../backend/firebasePatientUtilities";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
 * @param  {} Date
 * @param  {} Description
 * @param  {} Location
 * @param  {} PostalCode
 */
function createData(Date, Description, Location, PostalCode) {
  return {
    diaryDate: Date,
    contactFullName: Description,
    contactPhoneNumber: Location,
    contactEmail: PostalCode,
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
function DiaryList(props) {
  const classes = dropdownStyle(); // adding styling
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [patientDiaries, setPatientDiaries] = useState([]);
  const [patientInfo, setPatientInfo] = useState("");

  // Pull 'userEmail' out from the centralized store
  // const userEmail = useSelector((state) => state.auth.userEmail);
  useEffect(() => {
    props && props.patientInfo && setPatientInfo(props.patientInfo);
  }, [props, props.patientInfo]);

  // Get Diary entries of Patient
  useEffect(() => {
    getDiary(patientInfo, false)
      .then((diaries) => {
        diaries &&
          setPatientDiaries(
            diaries.map((diary) =>
              createData(
                diary?.timestamp?.toDate()?.toLocaleString() || "",
                diary.description || "",
                diary.location || "",
                diary.postalCode || ""
              )
            )
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientInfo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // creating new page
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // setting the page with data
    setPage(0);
  };

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
              Description
            </TableCell>
            <TableCell
              className="DIARY__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Location
            </TableCell>
            <TableCell
              className="DIARY__table__header"
              sx={{ borderColor: "var(--secondary-light)" }}
              align="right"
            >
              Postal Code
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* adding rows in table */}
          {patientDiaries &&
            (rowsPerPage > 0
              ? patientDiaries.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ) // calculating how many items to display per page
              : patientDiaries
            ).map((row) => (
              // getting the data of each row
              <TableRow key={row.Date}>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  component="th"
                  scope="row"
                >
                  {row.Date} {/* getting the diary entry date */}
                </TableCell>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.Description} {/* getting the contact full name */}
                </TableCell>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.Location}
                  {/* getting the contact phone number*/}
                </TableCell>
                <TableCell
                  className="DIARY__table__data"
                  sx={{ borderColor: "var(--primary-light)" }}
                  style={{ width: 160 }}
                  align="right"
                >
                  {row.PostalCode} {/* getting the contact email */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {patientDiaries && (
              <TablePagination // adding table pagination
                sx={{ borderColor: "transparent" }}
                classes={{
                  root: classes.color,
                }}
                rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]} // adding options dropdown pagination to choose from
                colSpan={3}
                count={patientDiaries.length} // getting how many rows there are in total
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
