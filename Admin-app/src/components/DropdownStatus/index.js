import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import "./DropdownStatus.css";

const useStyles = makeStyles({
  paper: {
    background: "#171717",
    borderRadius: "10px",
  }
});

function DropdownStatus() {
  const classes = useStyles();
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
      <FormControl sx={{minWidth: 116 }}>
        <InputLabel className="data" shrink={false}>{status === '' && 'Select Status'}</InputLabel>
        <Select
          value={status}
          onChange={handleChange}
          input={<OutlinedInput label="Doctor" />}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: "transparent"
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