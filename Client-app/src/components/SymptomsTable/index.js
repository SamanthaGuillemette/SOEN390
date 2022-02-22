import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { CardHeader } from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import HealingIcon from "@mui/icons-material/Healing";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import VirusIcon from "../../assets/virus.svg";
import "./SymptomsTable.css";
import { padding } from "@mui/system";

const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)",
    color: "var(--text-inactive)",
    borderRadius: "10px",
  },
  color: {
    color: "var(--text-inactive)",
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

function createData(symptomDate, status) {
  return { symptomDate, status };
}

const rows = [
  createData("05/02/22", <span className="label-negative">negative</span>),
  createData("22/03/22", <span className="label-positive">positive</span>),
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
    <div sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
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
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </div>
  );
}

function SymptomsTable() {
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
        <TableContainer className="symptoms-list">
          <Box className="label">
            <img className="symptoms__icon" src={VirusIcon} alt="Symptoms" />
            Symptoms List
          </Box>
          <Table sx={{ minWidth: 50 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="header"
                  sx={{ borderColor: "var(--secondary-light)" }}
                >
                  Date of Contact
                </TableCell>
                <TableCell
                  className="header"
                  sx={{ borderColor: "var(--secondary-light)" }}
                  align="right"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    className="data"
                    sx={{ borderColor: "var(--primary-light)" }}
                    component="th"
                    scope="row"
                  >
                    {row.symptomDate}
                  </TableCell>
                  <TableCell
                    className="data"
                    sx={{ borderColor: "var(--primary-light)" }}
                    style={{ width: 160 }}
                    align="right"
                  >
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  sx={{ borderColor: "transparent", m: 0, p: 0 }}
                  classes={{
                    root: classes.color,
                  }}
                  rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
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
                          backgroundColor: "var(--background-secondary)",
                        },
                      },
                    },
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

export default SymptomsTable;
