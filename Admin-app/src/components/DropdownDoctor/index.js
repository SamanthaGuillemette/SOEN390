import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import "./DropdownDoctor.css";
import { getDoctors } from "../../backend/firebaseDoctorUtilities";
import { setAssignedDoctor} from "../../backend/firebasePatientUtilities";
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
  const [patientInfo, setPatientInfo] = React.useState(null); // initially string is empty
  const [doctorsList, setDoctorsList] = useState(null);
 
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    patientInfo && setAssignedDoctor(patientInfo.id, value === "0"?null:value).then((newPatientInfo) => setPatientInfo(newPatientInfo))
  };

  useEffect(() => {
    getDoctors().then((data) => {
      let results = [];
      data.forEach((doc) => {
        results[doc.id] = doc;
      });
      setDoctorsList(results);
    });
  }, []);
  
  useEffect(() => {
    props && props.patientInfo && setPatientInfo(props.patientInfo);
  }, [props, props.patientInfo]);    

  return doctorsList && (
      <FormControl sx={{minWidth: 130}}>
        <Select data-testid="select2" className="data"
          onChange={handleChange} // changing the text to the chosen
          value={patientInfo && patientInfo.assignedDoctor in doctorsList? patientInfo.assignedDoctor : "0"}
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
          <MenuItem className="data" value="0">&lt;Doctor is Unassigned&gt;</MenuItem>
          {doctorsList && Object.values(doctorsList) && Object.values(doctorsList).map((doctor) =>
          <MenuItem className="data" value = {doctor.id}>{doctor.name}</MenuItem>
          )}
        </Select>
      </FormControl>
  );
}

export default DropdownDoctor;