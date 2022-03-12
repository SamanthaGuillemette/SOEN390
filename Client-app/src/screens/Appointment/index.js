import Box from "@mui/material/Box";
import BottomNav from "../../components/BottomNav";
import MenuAppBar from "../../components/Navbar";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./Appointment.css";
import { Button } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "var(--background-secondary)",
    },
  },
});

const Appointment = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, color: "var(--text-primary)" }}>
          <MenuAppBar />

          <div className="appointment-topContainer">
            <div className="appointment-topTitle">Upcoming Appointment</div>
            <div className="appointment-quickAccessContainer">
              <div className="appointment-quickAccess_DoctorIcon">
                Doctor Icon
              </div>
              <div className="appointment-quickAccess_InboxButton">
                Inbox Button
              </div>
            </div>
          </div>

          <div className="appointment-mainContainer">
            <div className="appointment-title">
              Meeting with Dr. Faye Anthony
            </div>
            <div className="appointment-description">Description:</div>
            <div className="appointment-descriptionDetails">
              Covid PCR testing. Requested by patient.
            </div>
            <div className="appointment-time">Time: </div>
            <div className="appointment-timeDetails">
              9:00AM Thursday 17 March, 2022
            </div>
            <div className="appointment-location">Location:</div>
            <div className="appointment-locationDetails">
              St. Mary's Hospital
            </div>
            <div classname="appointment-note">Note:</div>
            <div classname="appointment-noteDetails">
              Please bring your health insurance card, personal ID, and related
              documents.
            </div>

            <div className="appointment-buttonContainer">
              <Button type="submit" variant="contained">
                ACCEPT
              </Button>
              <Button type="submit" variant="contained">
                DECLINE
              </Button>
            </div>
          </div>

          <BottomNav />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Appointment;
