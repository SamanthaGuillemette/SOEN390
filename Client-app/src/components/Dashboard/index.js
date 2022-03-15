import { Box, Grid } from "@mui/material";

import "./Dashboard.css";
import NewspaperIcon from "../../assets/newspaper-sharp-white.svg";
import CalendarIcon from "../../assets/calendar-page.svg";
import VirusIcon from "../../assets/virus.svg";
import NoteIcon from "../../assets/note.svg";
import MessageIcon from "../../assets/message.svg";
import QRCodeIcon from "../../assets/qr-codes.svg";
import DoctorIcon from "../../assets/doctor.svg";
import HealthCareIcon from "../../assets/health-care.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Box
        sx={{
          padding: 4,
          paddingBottom: "120px",
          backgroundColor: "var(--background-secondary)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src={CalendarIcon}
                alt="Appointment"
              />
              <p data-testid="appointment" className="dashboard-card__title">
                Appointment
              </p>
            </div>
          </Grid>

          <Grid item xs={6}>
            <Link to="../symptoms">
              <div className="dashboard-card__container">
                <img
                  className="dashboard-card__img"
                  src={VirusIcon}
                  alt="Symptoms"
                />
                <p className="dashboard-card__title">Symptoms</p>
              </div>
            </Link>
          </Grid>

          <Grid item xs={6}>
            <Link to="../diary">
              <div className="dashboard-card__container">
                <img
                  className="dashboard-card__img"
                  src={NoteIcon}
                  alt="Diary"
                />
                <p className="dashboard-card__title">Diary</p>
              </div>
            </Link>
          </Grid>

          <Grid item xs={6}>
            <Link to="../clientinbox">
              <div className="dashboard-card__container">
                <img
                  className="dashboard-card__img"
                  src={MessageIcon}
                  alt="Send message"
                />
                <p className="dashboard-card__title">Send Message</p>
              </div>
            </Link>
          </Grid>

          <Grid item xs={6}>
            <Link to="../qr">
              <div className="dashboard-card__container">
                <img
                  className="dashboard-card__img"
                  src={QRCodeIcon}
                  alt="QR code"
                />
                <p className="dashboard-card__title">QR Code</p>
              </div>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <div className="dashboard-card__container">
              <img
                className="dashboard-card__img"
                src={NewspaperIcon}
                alt="News"
              />
              <p className="dashboard-card__title">News</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Link to="../mydoctor">
              <div className="dashboard-card__container">
                <img
                  className="dashboard-card__img"
                  src={DoctorIcon}
                  alt="My Doctor"
                />
                <p className="dashboard-card__title">My Doctor</p>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="../status">
              <div className="dashboard-card__container">
                <img
                  className="dashboard-card__img"
                  src={HealthCareIcon}
                  alt="Update Status"
                />
                <p className="dashboard-card__title">Update status</p>
              </div>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
