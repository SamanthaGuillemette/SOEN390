import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import "./DropdownStatus.css";

const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)",
    borderRadius: "10px",
  },
  icon: {
    fill: 'var(--text-inactive)',
  },
});

function DropdownStatus() {
  const classes = dropdownStyle();
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
      <FormControl sx={{minWidth: 130 }}>
        <InputLabel className="data" shrink={false}>{status === '' && 'Select Status'}</InputLabel>
        <Select data-testid = "select3"
          value={status}
          onChange={handleChange}
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
        <MenuItem value="positive">
            <span class="label-positive">positive</span>
        </MenuItem>
        <MenuItem value="negative">
            <span class="label-negative">negative</span>
        </MenuItem>
        </Select>
      </FormControl>
  );
}

export default DropdownStatus;