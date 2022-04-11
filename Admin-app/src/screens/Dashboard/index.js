/**
 * @fileoverview This component takes care of the Dashboard function.
 *
 */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import "./Dashboard.css";
import DashboardCards from "../../components/DashboardCards";
import DashboardStats from "../../components/DashboardStats";
import FlaggedPatients from "./FlaggedPatients";
import Typography from "@mui/material/Typography";

/**
 * Main function which will render the dashboard
 */
const Dashboard = () => {
  return (
    // This returns the buttons on the top which display the buttons on the top, this one is for the patients
    <Container maxWidth="xl">
      <Grid container spacing={2} className="STAT__container">
        <DashboardStats /> {/* Displaying DashbordStats */}
        {/* Here it displays the flagged patients and the doughnut charts*/}
        <Grid container spacing={3} className="STAT__container">
          <Grid item xs={4}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "var(--text-primary)",
                fontWeight: "bold",
                textAlign: "left",
                mb: 2,
              }}
            >
              Doctors Available vs Unavailable
            </Typography>
            <Card
              sx={{
                background: "inherit",
                boxShadow: "none",
                borderRadius: "20px",
              }}
            >
              <DoughnutChart />
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Typography
              sx={{
                fontSize: "18px",
                color: "var(--text-primary)",
                fontWeight: "bold",
                textAlign: "left",
                mb: 2,
              }}
            >
              Priority Patients
            </Typography>
            <FlaggedPatients />
          </Grid>
        </Grid>
        {/* Displaying DashbordCards */}
        <DashboardCards />
      </Grid>
    </Container>
  );
};

export default Dashboard;
