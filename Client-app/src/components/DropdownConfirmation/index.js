/**
 * @fileoverview This component displays the confirmation dropdown.
 *
 */
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core/styles";

// styling the dropdown
const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // changing background color of dropdown
    borderRadius: "10px", // making corners rounded
  },
  icon: {
    fill: "var(--text-inactive)", // color for dropdown button
  },
});

function DropdownConfirmation() {
  const classes = dropdownStyle(); // adding styling
  const [confirmation, setConfirmation] = React.useState(""); // empty choice

  /**
   * Handle the change of the dropdown option
   * @param  {browserEvent} event
   */
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setConfirmation(
      typeof value === "string" ? value.split(",") : value // storing the confirmation string
    );
  };

  return (
    <FormControl sx={{ minWidth: 140 }}>
      <InputLabel className="data" shrink={false}>
        {confirmation === "" && "Confirm Status"}
      </InputLabel>{" "}
      {/* removing the shrinking of the form title */}
      <Select
        data-testid="select1"
        className="data"
        value={confirmation}
        onChange={handleChange} // changing the text to the chosen
        inputProps={{
          classes: {
            icon: classes.icon,
          },
        }}
        MenuProps={{
          sx: {
            "&& .Mui-selected": {
              backgroundColor: "var(--background-secondary)",
            },
          },
          classes: {
            paper: classes.paper,
          },
        }}
      >
        <MenuItem className="data" value="1">
          Confirmed
        </MenuItem>{" "}
        {/* adding dropdown option */}
      </Select>
    </FormControl>
  );
}

export default DropdownConfirmation;
