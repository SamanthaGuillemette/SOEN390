import { Fragment } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

/**
 * setAge function works for setting the age of the patient
 * @param  {} dobStr
 */
function getAge(dobStr) {
  var todaysDate = new Date(); // First get today's date
  var dob = new Date(dobStr); // Convert date of birth string to a date objects

  var ageNow = todaysDate.getFullYear() - dob.getFullYear(); // storing age
  var m = todaysDate.getMonth() - dob.getMonth(); // storing month

  if (m < 0 || (m === 0 && todaysDate.getDate < dob.getDate())) {
    ageNow -= 1; // decreasing age
  }

  if (ageNow < 0) {
    // if negative value
    return 0; // return 0
  } else {
    return ageNow; // returning
  }
}

function SingleRow(props) {
  const { row } = props;
  const [open, setOpen] = useState(false); // setting the open condition to be false

  return (
    <Fragment>
      <TableRow>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "var(--text-primary)" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
            {/* changing icon to up or down based on open or not */}
          </IconButton>
        </TableCell>
        {/* Displaying row of data */}
        <TableCell
          sx={{ borderColor: "var(--background-secondary)" }}
          className="PATIENT__table__data"
          component="th"
          scope="row"
          align="left"
        >
          {row.patientname}
        </TableCell>
        <TableCell
          sx={{ borderColor: "var(--background-secondary)" }}
          className="PATIENT__table__data"
          align="left"
        >
          {row.email}
        </TableCell>
        <TableCell
          sx={{ borderColor: "var(--background-secondary)" }}
          className="PATIENT__table__data"
          align="center"
        >
          {row.status}
        </TableCell>
        <TableCell
          sx={{ borderColor: "var(--background-secondary)" }}
          className="PATIENT__table__data"
          align="left"
        >
          {row.doctor}
        </TableCell>
        <TableCell
          sx={{ borderColor: "var(--background-secondary)" }}
          className="PATIENT__table__data"
          align="center"
        >
          {row.priority}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{ borderColor: "var(--background-secondary)" }}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          {/* Adding collapsible table */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* Adding Table Label */}
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                color="var(--text-inactive)"
              >
                Personal Information
              </Typography>
              <Table size="small" aria-label="purchases">
                {/* Adding the body of collapsible table */}
                {/* Displaying each row */}
                {row.personalInfo.map((infoRow) => (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="PERSONAL-INFO__table__data"
                        component="th"
                        scope="row"
                      >
                        {`Age: ${getAge(infoRow.birthday)}`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="PERSONAL-INFO__table__data"
                      >
                        {`Birthday: ${infoRow.birthday}`}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="PERSONAL-INFO__table__data"
                      >
                        {`Address: ${infoRow.address}`}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default SingleRow;
