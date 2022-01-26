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
import COVID19Button from "../../components/COVID-19 Button/index"
import EventButton from "../../components/Event Button/index";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


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

        <COVID19Button style ={{marginLeft:100}}></COVID19Button>
        <EventButton style ={{marginLeft:100}}></EventButton>

      

      <List className="patientList"
      sx={{
        width: '28vh',
        maxWidth: 'xl',
        bgcolor: 'background.paper',
        overflow: 'auto',
        maxHeight: '30vh',
        marginTop:3,
        marginLeft:5,
        '& ul': { padding: 0 },
      }}
     
      subheader={<li />} > 
      <Typography className = "listTitle"  gutterBottom variant="h1" component="div">
      Patient's list
      </Typography>
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>

    <Card className="cardShape">
    <CardMedia
      component="img"
      height="140"
      image="https://api.time.com/wp-content/uploads/2020/08/coronavirus-testing.jpg"
      alt="covid testing"
    />
    <CardContent>
    <p className = "card-details">Info</p>
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
