/**
 * @fileoverview This component takes care of the AdminList function's row.
 *
 */
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { setAuthorized } from "../../backend/firebaseAdminUtilities";
import { useState } from "react";
import "./AdminList.css";

/**
 * This function displays each row of the admin list
 * */
function EachRow(props) {
  const { row } = props;
  const [authorizedValue, setAuthorizedValue] = useState(props.row.authorized);

  function onClickAuthorize() {
    setAuthorized(row.email).then((newAuthorizedValue) =>
      setAuthorizedValue(newAuthorizedValue)
    );
  }

  return (
    <TableRow>
      {/* Displaying row of data */}
      <TableCell
        sx={{
          borderColor: "var(--background-secondary)",
          color: !authorizedValue
            ? "var(--text-inactive)"
            : "var(--text-primary)",
        }}
        className="ADMIN__table__data"
        component="th"
        scope="row"
        align="left"
      >
        {row.adminName}
      </TableCell>
      <TableCell
        sx={{
          borderColor: "var(--background-secondary)",
          color: !authorizedValue
            ? "var(--text-inactive)"
            : "var(--text-primary)",
        }}
        className="ADMIN__table__data"
        align="left"
      >
        {row.email}
      </TableCell>
      <TableCell
        sx={{
          borderColor: "var(--background-secondary)",
          color: !authorizedValue
            ? "var(--text-inactive)"
            : "var(--text-primary)",
        }}
        className="ADMIN__table__data"
        align="center"
      >
        {row.dob}
      </TableCell>
      <TableCell
        sx={{
          borderColor: "var(--background-secondary)",
          color: !authorizedValue
            ? "var(--text-inactive)"
            : "var(--text-primary)",
        }}
        className={
          row.role === "Health Official" && authorizedValue
            ? "ROLE__label-health-off"
            : row.role === "Immigration Officer" && authorizedValue
            ? "ROLE__label-immigration-off"
            : authorizedValue
            ? "ROLE__label-doctor"
            : "ADMIN__table__data"
        }
        align="center"
      >
        {row.role}
      </TableCell>
      <TableCell
        sx={{ borderColor: "var(--background-secondary)" }}
        className="ADMIN__table__data"
        align="center"
      >
        <FormControlLabel
          label=""
          control={
            <Checkbox
              sx={{
                color: authorizedValue ? "#d32f2f !important" : "white",
              }}
              value="allowExtraEmails"
              onClick={() => {
                onClickAuthorize();
              }}
              checked={authorizedValue}
            />
          }
        />
      </TableCell>
    </TableRow>
  );
}

export default EachRow;
