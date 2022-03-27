/**
 * @fileoverview This component takes care of the DropdownStatus function.
 *
 */
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { setStatus } from "../../backend/firebasePatientUtilities";
import "./DropdownStatus.css";

// adding styling
const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // changing background color
    borderRadius: "10px", // making corners rounded
  },
  icon: {
    fill: "var(--text-inactive)", // changing color of dropdown button
  },
});

/**
 * This component is what allows the DropdownStatus feature to work. Below are many consts and
 * useEffect hooks that communicate with the database in order to recieve or send information.
 * @param  {} props
 */
function DropdownStatus(props) {
  const classes = dropdownStyle(); // adding styling
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    props && props.patientInfo && setPatientInfo(props.patientInfo);
  }, [props, props.patientInfo]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (patientInfo != null) {
      // if status and patient exists
      setStatus(patientInfo.email, value).then((newPatientInfo) =>
        setPatientInfo(newPatientInfo)
      ); // then setting
    }
  };

  return (
    <FormControl sx={{ minWidth: 130 }}>
      <InputLabel className="PATIENT__table__data" shrink={false}></InputLabel>{" "}
      {/* removing the shrinking of the form title */}
      <Select
        data-testid="select3"
        value={
          patientInfo && patientInfo.status ? patientInfo.status : "UNCONFIRMED"
        } // setting value to be the new status
        onChange={handleChange} // changing the text to the chosen
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              backgroundColor: "transparent !important",
            },
          },
          classes: {
            paper: classes.paper,
          },
        }}
      >
        <MenuItem value="POSITIVE">
          {" "}
          {/* dropdown option 1 */}
          <span className="PATIENT__label-positive">positive</span>
        </MenuItem>
        <MenuItem value="NEGATIVE">
          {" "}
          {/* dropdown option 2 */}
          <span className="PATIENT__label-negative">negative</span>
        </MenuItem>
        <MenuItem value="UNCONFIRMED">
          {" "}
          {/* dropdown option 3 */}
          <span className="PATIENT__label-unconfirmed">unconfirmed</span>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownStatus;
