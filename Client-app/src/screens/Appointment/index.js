import Box from "@mui/material/Box";
import BottomNav from "../../components/BottomNav";
import MenuAppBar from "../../components/Navbar";
import "./Appointment.css";
import { Button } from "@mui/material";
import DoctorIcon from "../../assets/doctor-icon.svg";

const Appointment = () => {
  return (
    <div>
        <Box sx={{ flexGrow: 1, color: "var(--text-primary)" }}>
          <MenuAppBar />

          <div className="appointment-topContainer">
            <h1 className="appointment-topTitle">Upcoming Appointment</h1>
            <div className="appointment-quickAccessContainer">
              <div className="appointment-quickAccess_DoctorIcon">
                <img src={DoctorIcon} alt="Doctor Icon" width="50" />
              </div>
              <div className="appointment-quickAccess_InboxButton">
                <Button type="submit" variant="contained">
                  Talk to doctor
                </Button>
              </div>
            </div>
          </div>

          <div className="appointment-mainContainer">
            <h2 className="appointment-title">Meeting with Dr. Faye Anthony</h2>
            <h4 className="appointment-subTitle">Description:</h4>
            <div className="appointment-textContent">
              Covid PCR testing. Requested by patient.
            </div>
            <h4 className="appointment-subTitle">Time: </h4>
            <div className="appointment-textContent">
              9:00AM Thursday 17 March, 2022
            </div>
            <h4 className="appointment-subTitle">Location:</h4>
            <div className="appointment-textContent">St. Mary's Hospital</div>
            <h4 className="appointment-subTitle">Note: </h4>
            <div className="appointment-textContent">
              Please bring your health insurance card, personal ID, and related
              documents.
            </div>

            <div className="appointment-buttonContainer">
              <Button
                type="submit"
                variant="contained"
                className="appointment-acceptButton"
              >
                ACCEPT
              </Button>
              <Button type="submit" variant="outlined">
                DECLINE
              </Button>
            </div>
          </div>
          <BottomNav />
        </Box>
    </div>
  );
};

export default Appointment;
