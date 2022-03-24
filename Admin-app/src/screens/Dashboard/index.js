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
import "./Dashboard.css";
import UpcomingEvents from "../../components/UpcomingEvents";
import DashboardCards from "../../components/DashboardCards";
import DashboardStats from "../../components/DashboardStats";
import {useState, useEffect} from "react";
import {getPatients} from "../../backend/firebasePatientUtilities";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { Link } from "react-router-dom";


/**
 * Main function which will render the dashboard
 */
const Dashboard = () => {

  const [patientList, setPatientList] = useState(null);

  useEffect(() =>{
    getPatients().then((data) => { 
      let patients_array = []
      data.forEach((patient) => {
        if (patient.flaggedPriority === "1"){
      patients_array.push(patient);
      }});
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
          <TableContainer
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
            <Typography data-testid = "patientlist" textAlign="center" variant="h6" sx={{color: "var(--text-primary)", borderColor: "transparent", mt: 2, mb: 2}}>
              Flagged Patient's List
            </Typography>
            <Table>
            {/* While here is the implementation*/}
            <TableBody>
            {patientList != null ? patientList.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  sx={{ borderColor: "transparent"}}
                  component="th"
                  scope="row"
                  align="left">
            {/*Added the link to the table name */}
                  <Link
              className="PATIENT__table__name"
              to={`/patientprofile/${row.id}`}
            >{`${row.firstName} ${row.lastName}`}
            </Link>
                   {/* getting the patient name */}
                  </TableCell>
                  <TableCell
                  sx={{ borderColor: "transparent" }}
                  component="th"
                  scope="row"
                  align="right">
                  <span className={row.status === "POSITIVE" ? "PATIENT__label-positive" : row.status === "NEGATIVE"
                  ? "PATIENT__label-negative"
                  : "PATIENT__label-unconfirmed"}>{row.status ? row.status : "UNCONFIRMED"}</span>{/* getting the patient name */}
                  </TableCell>
                </TableRow>
            )): ""}
            </TableBody>
            </Table>
          </TableContainer>
          <UpcomingEvents/>
          <DashboardCards/>{/* Displaying DashbordCards */}
        </Grid>
    </Container>
  );
};

export default Dashboard;