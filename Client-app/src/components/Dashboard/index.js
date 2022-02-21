import { Box, Grid, IconButton } from "@mui/material";
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          padding: 4,
          paddingBottom: "120px",
          backgroundColor: "",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src="https://www.svgrepo.com/show/110710/calendar-page.svg"
                alt="Appointment"
              />
              <p className="dashboard-card__title">Appointment</p>
            </div>
          </Grid>

          <Grid item xs={6}>
            <Link to="../symptoms">
              <div className="dashboard-card__container">
                <img
                  className="dashboard-card__img"
                  src="https://www.svgrepo.com/show/39290/virus.svg"
                  alt="Appointment"
                />
                <p className="dashboard-card__title">Symptoms</p>
              </div>
            </Link>
          </Grid>

          <Grid item xs={6}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src="https://www.svgrepo.com/show/73583/note.svg"
                alt="Appointment"
              />
              <p className="dashboard-card__title">Diary</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src="https://www.svgrepo.com/show/110910/message.svg"
                alt="Appointment"
              />
              <p className="dashboard-card__title">Send Message</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src="https://www.svgrepo.com/show/145685/qr-codes.svg"
                alt="Appointment"
              />
              <p className="dashboard-card__title">QR Code</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src="https://www.svgrepo.com/show/327133/newspaper-sharp.svg"
                alt="Appointment"
              />
              <p className="dashboard-card__title">News</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src="https://www.svgrepo.com/show/15254/health-care.svg"
                alt="Appointment"
              />
              <p className="dashboard-card__title">My Doctor</p>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src="https://www.svgrepo.com/show/169567/health-care.svg"
                alt="Appointment"
              />
              <p className="dashboard-card__title">Update status</p>
            </div>
          </Grid>
        </Grid>
      </Box>
      <BottomNav />
    </>
  );
};

export default Dashboard;
