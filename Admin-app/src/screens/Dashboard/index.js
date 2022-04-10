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
import EventButton from "../../components/EventButton";
import COVID19Button from "../../components/COVID-19Button";
import FlaggedPatients from "./FlaggedPatients";

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
          <Grid item>
            <Card
              className="STAT_item"
              sx={{
                background: "var(--background-main)",
                boxShadow: "none",
              }}
            >
              <DoughnutChart />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <FlaggedPatients />
          </Grid>
        </Grid>
        <EventButton />
        <COVID19Button />
        {/* Displaying DashbordCards */}
        <DashboardCards />
      </Grid>
    </Container>
  );
};

export default Dashboard;
