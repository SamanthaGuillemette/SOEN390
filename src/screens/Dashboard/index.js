import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./Dashboard.css";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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

        <h1 className="title">News</h1>
        <Card className="cardShape">
        <CardMedia
          component="img"
          height="140"
          image="https://api.time.com/wp-content/uploads/2020/08/coronavirus-testing.jpg"
          alt="covid testing"
        />
        <CardContent>
        <p className = "card-details">News</p>
          <Typography className="cardTitle" gutterBottom variant="h5" component="div">
            Covid-19 Testing Policies
          </Typography>
          <Typography className = "textContent" variant="body2" color="text.secondary">
            Find out how you could get tested if you develop any symptoms to the virus.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small"> <a target="_blank" href="https://www.ciussswestcentral.ca/health-alerts/coronavirus-covid-19/covid-19-testing-clinics/">Learn More</a></Button>
        </CardActions>
      </Card>

      
       
       
      </Grid>
    </Container>
  );
};

export default Dashboard;
