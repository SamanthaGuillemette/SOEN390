import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DoctorList from "../../components/Doctor-List/index";
import PatientList from "../../components/Patient-List/index";
import "./Patients.css";

const PatientListPage = () => {
  return (
    <Container className="background-box" maxWidth="xl">
      <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
        <Grid item xs={8} lg={12}></Grid>
          <Box className="title">Patient List</Box>
          <PatientList></PatientList>
          <DoctorList></DoctorList>
      </Grid>
    </Container>
    );
};

export default PatientListPage;
