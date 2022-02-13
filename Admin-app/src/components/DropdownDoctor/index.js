import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import "./DropdownDoctor.css";

const dropdownStyle = makeStyles({
  paper: {
    background: "#171717",
    borderRadius: "10px",
  },
  icon: {
    fill: '#767676',
  },
});

function DropdownDoctor() {
  const classes = dropdownStyle();
  const [doctorName, setDoctorName] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoctorName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
      <FormControl sx={{minWidth: 130}}>
        <InputLabel className="data" shrink={false}>{doctorName === '' && 'Assign Doctor'}</InputLabel>
        <Select className="data"
          value={doctorName}
          onChange={handleChange}
          inputProps={{
            classes: {
                icon: classes.icon,
            },
          }}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: "#1e1e1e"
              }
            },
            classes: {
              paper: classes.paper
            }
          }}
        >
        <MenuItem className="data" value="1">Allyson Richards</MenuItem>
        <MenuItem className="data" value="2">Charles Ludwig</MenuItem>
        </Select>
      </FormControl>
  );
}

export default DropdownDoctor;