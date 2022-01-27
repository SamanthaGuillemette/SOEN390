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
      <Grid container spacing={2} className="statContainer">
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
      <Typography className = "listTitle"  gutterBottom variant="h5">
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
   
 

   <Grid className="infoGrid" container spacing={2}>
   <Typography className="title" gutterBottom variant="h5">
   Important Links
   </Typography>
    <Card className="cardShape1">
    <CardMedia
      component="img"
      height="220"
      image="https://api.time.com/wp-content/uploads/2020/08/coronavirus-testing.jpg"
      alt="covid testing"
    />
    <CardContent>
    <p className = "card-details">Info</p>
      <Typography className="cardTitle" gutterBottom variant="h5" component="div"><a target="_blank" href="https://www.ciussswestcentral.ca/health-alerts/coronavirus-covid-19/covid-19-testing-clinics/">
        Covid-19 Testing Policies
        </a>
      </Typography>
      <Typography className = "textContent" variant="body2" color="text.secondary">
        Find out how you could get tested if you develop any symptoms to the virus.
      </Typography>
    </CardContent>
  </Card>

  <Card className="cardShape2">
  <CardMedia
    component="img"
    height="220"
    image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/1200px-Flag_of_Quebec.svg.png"
    alt="covid testing"
  />
  <CardContent>
  <p className = "card-details">Info</p>
    <Typography className="cardTitle" gutterBottom variant="h5" component="div">
    <a target="_blank" href="https://www.quebec.ca/en/health/health-issues/a-z/2019-coronavirus/situation-coronavirus-in-quebec">Data of COVID-19 in Quebec</a>
    </Typography>
    <Typography className = "textContent" variant="body2" color="text.secondary">
    Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.
    </Typography>
  </CardContent>
</Card>
      
<Card className="cardShape3">
<CardMedia
  component="img"
  height="220"
  image="https://cdn.ciusssnordmtl.ca/documents/Nouvelles/2021/MUSC_VaccinationCovid19_Nouvelle_site_webF.png?1614089135"
  alt="covid testing"
/>
<CardContent>
<p className = "card-details">Info</p>
  <Typography className="cardTitle" gutterBottom variant="h5" component="div">
  <a target="_blank" href="https://portal3.clicsante.ca/">Appointment for vaccination</a>
  </Typography>
  <Typography className = "textContent" variant="body2" color="text.secondary">
    To book a appointment for the vaccination, as well as check eligibilty, click on this link for more info.
  </Typography>
</CardContent>
</Card>
      </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
