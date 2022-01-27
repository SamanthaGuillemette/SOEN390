import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "./Dashboard.css";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} className="statContainer">
        <Grid item xs={12} md={8}>
          <Card className="statItem">
            <LineChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="statItem">
            <DoughnutChart />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
