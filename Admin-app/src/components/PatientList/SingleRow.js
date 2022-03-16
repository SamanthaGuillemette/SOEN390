import {Fragment} from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function SingleRow(props) {
  const { row } = props;
  const [open, setOpen] = useState(false); // setting the open condition to be false

  return (
    <Fragment>
      <TableRow className={ row.statusReview === "Status Reviewed" ? "PatientList-reviewedStatus" : "" }>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "var(--text-primary)" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} {/* changing icon to up or down based on open or not */}
          </IconButton>
        </TableCell>
        {/* Displaying row of data */}
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="PATIENT__table__data" component="th" scope="row" align="left">
         {row.patientname}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="PATIENT__table__data" align="left" >
          {row.id}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="PATIENT__table__data" align="center" >
          {row.status}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="PATIENT__table__data" align="center" >
          {row.appointment}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="PATIENT__table__data" align="left">
          {row.doctor}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="PATIENT__table__data" align="center">
          {row.priority}
        </TableCell>
      </TableRow>
      <TableRow >
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
                Symptoms
              </Typography>
              <Table
                className="SYMPTOMS__table"
                size="small"
                aria-label="purchases"
              >
              {/* Start of Table headers */}
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ borderColor: "var(--primary-light)" }}
                      className="SYMPTOMS__table__data"
                    >
                      Temperature
                    </TableCell>
                    <TableCell
                      sx={{ borderColor: "var(--primary-light)" }}
                      className="SYMPTOMS__table__data"
                    >
                      Weight
                    </TableCell>
                    <TableCell
                      sx={{ borderColor: "var(--primary-light)" }}
                      className="SYMPTOMS__table__data"
                      align="right"
                    >
                      Height
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* End of Table Headers */}
                {/* Adding the body of collapsible table */}
                <TableBody>
                  {/* Displaying each row */}
                  {row.symptoms.map((symptomsRow) => (
                    <TableRow key={symptomsRow.date}>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="SYMPTOMS__table__data"
                        component="th"
                        scope="row"
                      >
                        {symptomsRow.temperature}
                      </TableCell>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="SYMPTOMS__table__data"
                      >
                        {symptomsRow.weight}
                      </TableCell>
                      <TableCell
                        sx={{ borderColor: "transparent" }}
                        className="SYMPTOMS__table__data"
                        align="right"
                      >
                        {symptomsRow.height}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default SingleRow;