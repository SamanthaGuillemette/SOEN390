import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "./Dashboard.css";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import LineChart from "../../components/Charts/LineChart";
import COVID19Button from "../../components/COVID-19 Button/index"
import EventButton from "../../components/Event Button/index";
import ContactButton from "../../components/Contact/index";
import SlideShow from "../../components/Slideshow/index";

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
        <ContactButton></ContactButton>
      <SlideShow></SlideShow>
       
      </Grid>
    </Container>
  );
};

export default Dashboard;
