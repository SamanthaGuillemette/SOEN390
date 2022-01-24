import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./Dashboard.css";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";
import COVID19Button from "../../components/COVID-19 Button/index"
import EventButton from "../../components/Event Button/index";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} className="statContainer">
        <Grid item xs={12} md={8}>
          <div className="statItem">
            <LineChart />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="statItem">
            <DoughnutChart />
          </div>
        </Grid>

        <COVID19Button></COVID19Button>
        <EventButton></EventButton>
        <Grid item xs={4}>
          <h2 style={{ backgroundColor: "lightBlue", height: "100px" }}>
            Five
          </h2>
        </Grid>
      
      </Grid>
    </Container>
  );
};

export default Dashboard;
