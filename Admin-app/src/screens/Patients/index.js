/**
 * @fileoverview This component takes care of displaying the patients and docors tables.
 *
 */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DoctorList from "../../components/DoctorList/index";
import PatientList from "../../components/PatientList/index";
import "./Patients.css";

const Patients = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
        <Grid item xs={8} lg={12}></Grid>
          <PatientList></PatientList>
          <DoctorList></DoctorList>
      </Grid>
    </Container>
    );
};

export default Patients;
