import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import "./DropdownDoctor.css";
import { getDoctors, patientLimit} from "../../backend/firebaseDoctorUtilities";
import { useEffect, useState } from "react";

const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // background color of dropdown
    borderRadius: "10px", // making corners rdunded
  },
  icon: {
    fill: 'var(--text-inactive)', // changing color of dropdown button
  },
});

function DropdownDoctor(props) {
  const classes = dropdownStyle(); // adding styling
  const [doctorName, setDoctorName] = React.useState('621927b609a71ec61d0d61da'); // initially string is empty
  const [doctorsList, setDoctorsList] = useState(null);
 
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDoctorName(value);
  };

// function to create data
/* function createData(doctorName, numOfPatients) {
  return {doctorName, numOfPatients};
}  
 */
  useEffect(() => {
    getDoctors().then((data) => {
      let results = [];
      data.forEach((doc) => {
        //const menuItemToAdd = (<MenuItem className={doc} value="1">{doc.name}</MenuItem>);
        results.push(doc);
      });
      setDoctorsList(results);
    });
  }, []);
  
  useEffect(() => {
    props && props.assignedDoctor && setDoctorName(props.assignedDoctor);
  }, [props, props.assignedDoctor]);    

  doctorsList && console.log(doctorsList);
  console.log(`doctorName ${doctorName}`);
  return doctorsList && (
      <FormControl sx={{minWidth: 130}}>
        <InputLabel className="data" shrink={false}>{doctorName === '' && 'Assign Doctor'}</InputLabel> {/* removing the shrinking of the form title */}
        <Select data-testid="select2" className="data"
          onChange={handleChange} // changing the text to the chosen
          value={doctorName && doctorName}
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
          {doctorsList && doctorsList.map((doctor) =>
          <MenuItem className="data" value = {doctor.id} selected="true">{doctor.name}</MenuItem>
          )}
        </Select>
      </FormControl>
  );
}

export default DropdownDoctor;