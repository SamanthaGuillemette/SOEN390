import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";

const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)",
    borderRadius: "10px",
  },
  icon: {
    fill: 'var(--text-inactive)',
  },
});

function DropdownConfirmation() {
  const classes = dropdownStyle();
  const [confirmation, setConfirmation] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setConfirmation(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
      <FormControl sx={{minWidth: 140}}>
        <InputLabel className="data" shrink={false}>{confirmation === '' && 'Confirm Status'}</InputLabel>
        <Select data-testid = "select1" className="data"
          value={confirmation}
          onChange={handleChange}
          inputProps={{
            classes: {
                icon: classes.icon,
            },
          }}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: "var(--background-secondary)"
              }
            },
            classes: {
              paper: classes.paper
            }
          }}
        >
        <MenuItem className="data" value="1">Confirmed</MenuItem>
        </Select>
      </FormControl>
  );
}

export default DropdownConfirmation;