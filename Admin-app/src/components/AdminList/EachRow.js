/**
 * @fileoverview This component takes care of the AdminList function's row.
 *
 */
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {setDisabled} from "../../backend/firebaseAdminUtilities";
import {useState} from "react";
import "./AdminList.css";

/**
 * This function displays each row of the admin list
 * */
function EachRow(props) {
  const {row} = props
  const [disabledValue, setDisabledValue] = useState(props.row.disabled);

  function onClickDisable() {
    setDisabled(row.id).then((newDisabledValue) => setDisabledValue(newDisabledValue));
  }

  return (
      <TableRow>
        {/* Displaying row of data */}
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="ADMIN__table__data" component="th" scope="row" align="left">
         {row.adminName}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="ADMIN__table__data" align="left" >
          {row.id}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="PATIENT__table__data" align="center" >
          {row.dob}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)"}} className={row.role === "Administrator" ? "ROLE__label-admin" : row.role === "Health Official" ? "ROLE__label-health-off" : row.role === "Immigration Officer" ? "ROLE__label-immigration-off" : "ROLE__label-doctor"} align="center" >
          {row.role}
        </TableCell>
        <TableCell sx={{ borderColor: "var(--background-secondary)" }} className="ADMIN__table__data" align="center">
          <FormControlLabel
            label=""
            control={
            <Checkbox
              sx={{color: disabledValue === "true" ? "#d32f2f !important" : "white"}}
              value="allowExtraEmails"
              onClick={() => {onClickDisable()}}
              checked={disabledValue === "true"}
              />
            }
          />
        </TableCell>
      </TableRow>
  );
}

export default EachRow;