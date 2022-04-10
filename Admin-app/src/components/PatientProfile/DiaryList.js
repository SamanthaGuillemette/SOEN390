/**
 * @fileoverview This component takes care of the PatientList function.
 *
 */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

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

function DiaryList(props) {
  const classes = dropdownStyle(); // adding styling
  const [patientDiaries, setPatientDiaries] = useState(null); // initially string is empty
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    props && props.patientDiaries && setPatientDiaries(props.patientDiaries);
  }, [props, props.patientDiaries]);

  /**
   * Function that handles changing the page of the patients
   * @param  {} event
   * @param  {} newPage
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Function that handles changing the row per page
   * @param  {} event
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer
      data-testid="table-2"
      sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
    >
      <h5 className="PATIENT-DIARY__table__label">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DIARY HISTORY{" "}
        <h5 className="PATIENT-DIARY__table__label__no-data">
          {patientDiaries &&
            patientDiaries.length === 0 &&
            `(NO DIARIES ENTERED YET)`}
        </h5>
      </h5>
      <Table aria-label="collapsible table">
        {/* Start of table headers */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ borderColor: "var(--primary-light)" }}
              className="PATIENT-DIARY__table__header"
              align="left"
            >
              Date
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--primary-light)" }}
              className="PATIENT-DIARY__table__header"
              align="left"
            >
              Description
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--primary-light)" }}
              className="PATIENT-DIARY__table__header"
              align="center"
            >
              Location
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--primary-light)" }}
              className="PATIENT-DIARY__table__header"
              align="right"
            >
              Postal Code
            </TableCell>
          </TableRow>
        </TableHead>
        {/* End of table headers */}
        <TableBody>
          {/* Calculating how many pages to show per page */}
          {patientDiaries &&
            (rowsPerPage > 0
              ? patientDiaries.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : patientDiaries
            ).map((row) => (
              <TableRow>
                {/* Displaying row of data */}
                <TableCell
                  sx={{ borderColor: "var(--primary-light)" }}
                  className="PATIENT-DIARY__table__data"
                  component="th"
                  scope="row"
                  align="left"
                >
                  {row.DateDiary}
                </TableCell>
                <TableCell
                  sx={{ borderColor: "var(--primary-light)" }}
                  className="PATIENT-DIARY__table__data"
                  align="left"
                >
                  {row.Description}
                </TableCell>
                <TableCell
                  sx={{ borderColor: "var(--primary-light)" }}
                  className="PATIENT-DIARY__table__data"
                  align="center"
                >
                  {row.Location}
                </TableCell>
                <TableCell
                  sx={{ borderColor: "var(--primary-light)" }}
                  className="PATIENT-DIARY__table__data"
                  align="right"
                >
                  {row.PostalCode}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {patientDiaries && (
        <TablePagination // adding pagination
          classes={{
            root: classes.color,
          }}
          rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]} // displaying options 5, 10, or ALL
          component="div"
          count={patientDiaries.length} // setting how many rows there are in total
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

export default DiaryList;
