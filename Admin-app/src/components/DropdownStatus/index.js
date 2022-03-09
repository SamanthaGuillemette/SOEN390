import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import "./DropdownStatus.css";

// adding styling
const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // changing background color
    borderRadius: "10px", // making corners rounded
  },
  icon: {
    fill: 'var(--text-inactive)', // changing color of dropdown button
  },
});

function DropdownStatus() {
  const classes = dropdownStyle(); // adding styling
  const [status, setStatus] = React.useState(''); // empty string

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(
      typeof value === 'string' ? value.split(',') : value, // setting status to be the string chosen
    );
  };

  return (
      <FormControl sx={{minWidth: 130 }}>
        <InputLabel className="data" shrink={false}>{status === '' && 'Select Status'}</InputLabel> {/* removing the shrinking of the form title */}
        <Select data-testid = "select3"
          value={status}
          onChange={handleChange} // changing the text to the chosen
          inputProps={{
            classes: {
                icon: classes.icon,
            },
          }}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: "transparent !important"
              }
            },
            classes: {
              paper: classes.paper
            }
          }}
        >
        <MenuItem value="positive"> {/* dropdown option 1 */}
            <span class="label-positive">positive</span>
        </MenuItem>
        <MenuItem value="negative"> {/* dropdown option 2 */}
            <span class="label-negative">negative</span>
        </MenuItem>
        <MenuItem value="unconfirmed"> {/* dropdown option 3 */}
            <span class="label-unconfirmed">unconfirmed</span>
        </MenuItem>
        </Select>
      </FormControl>
  );
}

export default DropdownStatus;