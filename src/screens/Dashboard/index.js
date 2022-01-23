import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./Dashboard.css";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";

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

        <Grid item xs={4}>
          <h2 style={{ backgroundColor: "lightGray", height: "100px" }}>
            Three
          </h2>
        </Grid>
        <Grid item xs={4}>
          <h2 style={{ backgroundColor: "lightPink", height: "100px" }}>
            Four
          </h2>
        </Grid>
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
