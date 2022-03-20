/**
 * @fileoverview This component takes care of the Dashboard function.
 *
 */
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import "./Dashboard.css";
import UpcomingEvents from "../../components/UpcomingEvents";
import DashboardCards from "../../components/DashboardCards";
import DashboardStats from "../../components/DashboardStats";
import {useState, useEffect} from "react";
import {getPatients} from "../../backend/firebasePatientUtilities";

/**
 * Main function which will render the dashboard
 */
const Dashboard = () => {

  const [patientList, setPatientList] = useState(null);

  useEffect(() =>{
    getPatients().then((data) => { 
      let patients_array = []
      data.forEach((patient) => {
      patients_array.push(patient.name);
      });
      setPatientList(patients_array);
    });
  }, []);

  return (
    // This returns the buttons on the top which display the buttons on the top, this one is for the patients
    <Container maxWidth="xl">
      <Grid container spacing={2} className="STAT__container">
      <DashboardStats/> {/* Displaying DashbordStats */}

      {/* Here it displays the line and the doughnut charts*/}
        <Grid container spacing={3} className="STAT__container">
          <Grid item xs={12} md={8}>
            <Card className="STAT_item" sx={{backgroundColor: "inherit", boxShadow: "none"}}>
              <LineChart/>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="STAT_item" sx={{background: 'var(--gradient-to-right-btm)'}}>
              <DoughnutChart />
            </Card>
          </Grid>
        </Grid>

      {/* The following is the Patient List which appears on the dashboard
          Here we have the styling.*/}  
          <List
            className="PATIENT-LIST"
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
            <Typography data-testid="patientlist" className="PATIENT-LIST__title" gutterBottom variant="h5" sx={{color: "var(--text-primary)", border: "transparent"}}>
              Patient's list
            </Typography>
            {patientList.map((name) => (
                <ListItem sx={{color: "var(--text-inactive)"}} key={`${name}`}>
                  <ListItemText primary={`${name}`} />
                </ListItem>
              ))}
          </List>
          <UpcomingEvents/>
          <DashboardCards/>{/* Displaying DashbordCards */}
        </Grid>
    </Container>
  );
};

export default Dashboard;