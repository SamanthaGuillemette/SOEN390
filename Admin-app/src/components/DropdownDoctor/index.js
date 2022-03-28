/**
 * @fileoverview This component takes care of the DropdownDoctor function.
 *
 */
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core/styles";
import {
  getDoctor,
  getDoctors,
  patientLimit,
  removePatientFromDoctor,
  addPatientToDoctor,
} from "../../backend/firebaseDoctorUtilities";
import { setAssignedDoctor } from "../../backend/firebasePatientUtilities";
import { useEffect, useState } from "react";

const dropdownStyle = makeStyles({
  paper: {
    background: "var(--background-main)", // background color of dropdown
    borderRadius: "10px", // making corners rdunded
  },
  icon: {
    fill: "var(--text-inactive)", // changing color of dropdown button
  },
});

/**
 * This function is used for the dropdown of the doctors.
 * Below are many consts and useEffect hooks that communicate with the database
 * in order to recieve or send information about the doctors and patients.
 *
 * @param  {} props
 */
function DropdownDoctor(props) {
  const classes = dropdownStyle(); // adding styling
  const [patientInfo, setPatientInfo] = useState(null); // initially string is empty
  const [doctorsList, setDoctorsList] = useState(null);

  useEffect(() => {
    getDoctors().then((data) => {
      let results = [];
      data.forEach((doc) => {
        results[doc.email] = doc;
      });
      setDoctorsList(results);
    });
  }, []);

  useEffect(() => {
    props && props.patientInfo && setPatientInfo(props.patientInfo);
  }, [props, props.patientInfo]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (patientInfo != null) {
      // Get selected doctor
      if (value !== "0") {
        getDoctor(value).then((selectedDoctor) => {
          if (!isDoctorAtFullCapacity(selectedDoctor)) {
            // Occurs when user chooses to associate a doctor to patient
            // If patient had an assigned doctor before, remove patient from old doctor
            if (patientInfo && patientInfo.assignedDoctor) {
              // Only remove association if there is one
              // Remove patient from old doctor's list
              const oldDoctor = removePatientFromDoctor(
                patientInfo.assignedDoctor,
                patientInfo.email
              );
              doctorsList[oldDoctor.email] = oldDoctor;
              setDoctorsList(doctorsList);
            }

            // Add new doctor to patient table
            setAssignedDoctor(patientInfo.email, value).then((newPatientInfo) =>
              setPatientInfo(newPatientInfo)
            );

            // Add patient to new doctor table
            const newDoctor = addPatientToDoctor(
              selectedDoctor.email,
              patientInfo.email
            );
            doctorsList[newDoctor.email] = newDoctor;
            setDoctorsList(doctorsList);
          }
        });
      } // Remove assigned doctor completely
      else {
        // Remove patient from doctor's list
        const doctor = removePatientFromDoctor(
          patientInfo.assignedDoctor,
          patientInfo.email
        );
        doctorsList[doctor.email] = doctor;
        setDoctorsList(doctorsList);

        // Remove doctor from patient
        setAssignedDoctor(patientInfo.email, null).then((newPatientInfo) =>
          setPatientInfo(newPatientInfo)
        );
      }
    }

    patientInfo &&
      setAssignedDoctor(patientInfo.email, value === "0" ? null : value).then(
        (newPatientInfo) => setPatientInfo(newPatientInfo)
      );
  };

  return (
    doctorsList && (
      <FormControl sx={{ minWidth: 130 }}>
        <Select
          data-testid="select2"
          className="PATIENT__table__data"
          onChange={handleChange} // changing the text to the chosen
          value={
            patientInfo && patientInfo.assignedDoctor in doctorsList
              ? patientInfo.assignedDoctor
              : "0"
          }
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
          <MenuItem className="PATIENT__table__data" value="0">
            &lt;Doctor is Unassigned&gt;
          </MenuItem>
          {doctorsList &&
            Object.values(doctorsList) &&
            Object.values(doctorsList).map((doctor) => (
              <MenuItem
                className="PATIENT__table__data"
                value={doctor.email}
                disabled={isDoctorAtFullCapacity(doctor)}
              >
                {`${doctor.firstName} ${doctor.lastName}`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    )
  );
}

/**
 * This function will check the capacity of the doctor.
 *
 * @param  {} doctor
 */
function isDoctorAtFullCapacity(doctor) {
  return doctor && doctor.treats && doctor.treats.length >= patientLimit;
}

export default DropdownDoctor;
