import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "./Dashboard.css";

import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";
import SmallStatBox from "../../components/SmallStatBox";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} className="statContainer">
        <Grid item xs={6} md={3}>
          <Card className="statItem">
            <SmallStatBox
              icon={<PersonIcon fontSize="large" color="primary" />}
              number="1523"
              description="Patients"
            />
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className="statItem">
            <SmallStatBox
              icon={
                <SupervisedUserCircleIcon fontSize="large" color="primary" />
              }
              number="1523"
              description="Doctors"
            />
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className="statItem">
            <SmallStatBox
              icon={<CoronavirusIcon fontSize="large" color="primary" />}
              number="1523"
              description="Active cases"
            />
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className="statItem">
            <SmallStatBox
              icon={<VerifiedUserIcon fontSize="large" color="primary" />}
              number="1523"
              description="Recovered"
            />
          </Card>
        </Grid>
      </Grid>

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
