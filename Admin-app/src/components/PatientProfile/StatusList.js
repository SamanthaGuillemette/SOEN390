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
import StatusRow from "./StatusRow";

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

function StatusList(props) {
  const classes = dropdownStyle(); // adding styling
  const [patientStatuses, setPatientStatuses] = useState(null); // initially string is empty
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    props && props.patientStatuses && setPatientStatuses(props.patientStatuses);
  }, [props, props.patientStatuses]);

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
      data-testid="table-1"
      sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
    >
      <h5 className="PATIENT-SYMPTOMS__table__label">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS HISTORY{" "}
        <h5 className="PATIENT-SYMPTOMS__table__label__no-data">
          {patientStatuses &&
            patientStatuses.length === 0 &&
            `(NO STATUSES ENTERED YET)`}
        </h5>
      </h5>
      <Table sx={{ minWidth: 650 }} aria-label="collapsable table">
        <TableHead>
          <TableRow>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
            >
              Date
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Fever
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Cough
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Runny Nose
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Muscle Ache
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Sore Throat
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Smell Loss
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Taste Loss
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Temperature (&deg;C)
            </TableCell>
            <TableCell
              className="PATIENT-SYMPTOMS__table__header"
              sx={{ borderColor: "var(--background-secondary)" }}
              align="center"
            >
              Weight (lb)
            </TableCell>
            <TableCell
              sx={{ borderColor: "var(--background-secondary)" }}
              className="PATIENT__table__header"
              align="center"
            >
              Reviewed
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientStatuses &&
            (rowsPerPage > 0
              ? patientStatuses.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : patientStatuses
            ).map((row) => <StatusRow key={row.id} row={row} />)}
        </TableBody>
      </Table>
      {patientStatuses && (
        <TablePagination // adding pagination
          classes={{
            root: classes.color,
          }}
          rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]} // displaying options 5, 10, or ALL
          component="div"
          count={patientStatuses.length} // setting how many rows there are in total
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

export default StatusList;
