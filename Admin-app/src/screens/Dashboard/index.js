import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import SmallStatBox from "../../components/SmallStatBox";
import "./Dashboard.css";
import UpcomingEvents from "../../components/UpcomingEvents";
import DashboardCards from "../../components/DashboardCards";

// Main function which will render the dashboard

const Dashboard = () => {
  return (
    // This returns the buttons on the top which display the buttons on the top, this one is for the patients
    <Container maxWidth="xl">
      <Grid container spacing={2} className="statContainer">
        <Grid container spacing={3} className="statContainer">
          <Grid item xs={6} md={3}>
            <Card className="statItem" sx={{backgroundColor: "var(--background-main)", color: "var(--text-inactive)"}}>
              <SmallStatBox
                icon={<PersonIcon fontSize="large" sx={{color: "var(--text-primary)"}} />}
                number="1523"
                description="Patients"
              />
            </Card>
          </Grid>
          {/* This button is for the doctors*/}
          <Grid item xs={6} md={3}>
            <Card className="statItem" sx={{backgroundColor: "var(--background-main)", color: "var(--text-inactive)"}}>
              <SmallStatBox
                icon={
                  <SupervisedUserCircleIcon fontSize="large" sx={{color: "var(--text-primary)"}} />
                }
                number="1523"
                description="Doctors"
              />
            </Card>
          </Grid>
            {/* This button is for the active cases*/}
          <Grid item xs={6} md={3}>
            <Card className="statItem" sx={{backgroundColor: "var(--background-main)", color: "var(--text-inactive)"}}>
              <SmallStatBox
                icon={<CoronavirusIcon fontSize="large" sx={{color: "var(--text-primary)"}} />}
                number="1523"
                description="Active cases"
              />
            </Card>
          </Grid>
            {/* This button is for the recovered cases*/}
          <Grid item xs={6} md={3}>
            <Card className="statItem" sx={{backgroundColor: "var(--background-main)", color: "var(--text-inactive)"}}>
              <SmallStatBox
                icon={<VerifiedUserIcon fontSize="large" sx={{color: "var(--text-primary)"}} />}
                number="1523"
                description="Recovered"
              />
            </Card>
          </Grid>
        </Grid>

      {/* Here it displays the line and the doughnut charts*/}

        <Grid container spacing={3} className="statContainer">
          <Grid item xs={12} md={8}>
            <Card className="statItem" sx={{backgroundColor: "inherit", boxShadow: "none"}}>
              <LineChart/>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="statItem" sx={{background: 'var(--gradient-to-right-btm)'}}>
              <DoughnutChart />
            </Card>
          </Grid>
        </Grid>

      {/* The following is the Patient List which appears on the dashboard
          Here we have the styling.*/}  
          <List
            className="patientList"
            sx={{
              width: "28vh",
              maxWidth: "xl",
              bgcolor: "var(--background-main)",
              overflow: "auto",
              maxHeight: "30vh",
              marginTop: 3,
              marginLeft: 5,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            {/* While here is the implementation*/}
            <Typography data-testid="patientlist" className="listTitle" gutterBottom variant="h5" sx={{color: "var(--text-primary)", border: "transparent"}}>
              Patient's list
            </Typography>
            {[0, 1, 2, 3, 4].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader sx={{bgcolor: "var(--background-main)", color: "var(--text-inactive)"}}>
                    {`I'm sticky ${sectionId}`}</ListSubheader>
                  {[0, 1, 2].map((item) => (
                    <ListItem sx={{color: "var(--text-inactive)"}} key={`item-${sectionId}-${item}`}>
                      <ListItemText primary={`Item ${item}`} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
          <UpcomingEvents/>
          <DashboardCards/>{/* Displaying DashbordCards */}
        </Grid>
    </Container>
  );
};

export default Dashboard;