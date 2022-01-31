import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DoctorList from "../../components/DoctorList/index";
import PatientList from "../../components/PatientList/index";

const Patients = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
        <Grid item xs={8} lg={12}></Grid>
          <PatientList></PatientList>
      </Grid>
    </Container>
    );
};

export default Patients;
