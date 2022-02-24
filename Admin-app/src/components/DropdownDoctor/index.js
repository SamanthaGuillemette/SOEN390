import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import "./DropdownDoctor.css";

const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // background color of dropdown
    borderRadius: "10px", // making corners rdunded
  },
  icon: {
    fill: 'var(--text-inactive)', // changing color of dropdown button
  },
});

function DropdownDoctor() {
  const classes = dropdownStyle(); // adding styling
  const [doctorName, setDoctorName] = React.useState(''); // initially string is empty

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoctorName(
      typeof value === 'string' ? value.split(',') : value, // storing the string value
    );
  };

  return (
      <FormControl sx={{minWidth: 130}}>
        <InputLabel className="data" shrink={false}>{doctorName === '' && 'Assign Doctor'}</InputLabel> {/* removing the shrinking of the form title */}
        <Select data-testid="select2" className="data"
          value={doctorName}
          onChange={handleChange} // changing the text to the chosen
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
        <MenuItem className="data" value="1">Allyson Richards</MenuItem> {/* dropdown option 1 */}
        <MenuItem className="data" value="2">Charles Ludwig</MenuItem> {/* dropdown option 2 */}
        </Select>
      </FormControl>
  );
}

export default DropdownDoctor;