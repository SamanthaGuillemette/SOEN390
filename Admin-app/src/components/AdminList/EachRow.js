/**
 * @fileoverview This component takes care of the AdminList function's row.
 *
 */
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { setNewAccount } from "../../backend/firebaseAdminUtilities";
import { useState } from "react";
import "./AdminList.css";

/**
 * This function displays each row of the admin list
 * */
function EachRow(props) {
  const { row } = props;
  const [authorized, setAuthorized] = useState(props.row.newAccount);

  function onClickAuthorize() {
    setNewAccount(row.id).then((newAccountValue) =>
      setAuthorized(newAccountValue)
    );
  }

  return (
    <TableRow>
      {/* Displaying row of data */}
      <TableCell
        sx={{
          borderColor: "var(--background-secondary)",
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
        }}
        className="ADMIN__table__data"
        align="left"
      >
        {row.id}
      </TableCell>
      <TableCell
        sx={{
          borderColor: "var(--background-secondary)",
        }}
        className="ADMIN__table__data"
        align="center"
      >
        {row.dob}
      </TableCell>
      <TableCell
        sx={{
          borderColor: "var(--background-secondary)",
        }}
        className={
          row.role === "Health Official" && !authorized
            ? "ROLE__label-health-off"
            : row.role === "Immigration Officer" && !authorized
            ? "ROLE__label-immigration-off"
            : !authorized
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
                color: !authorized ? "#d32f2f !important" : "white",
              }}
              value="allowExtraEmails"
              onClick={() => {
                onClickAuthorize();
              }}
              checked={!authorized}
            />
          }
        />
      </TableCell>
    </TableRow>
  );
}

export default EachRow;
