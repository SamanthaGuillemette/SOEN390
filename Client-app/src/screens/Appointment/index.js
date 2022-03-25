import Box from "@mui/material/Box";
import "./Appointment.css";
import { Button } from "@mui/material";
import DoctorIcon from "../../assets/doctor-icon.svg";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";

const Appointment = () => {
  const clientEmail = useSelector((state) => state.auth.userEmail);
  const assignedDoctorEmail = "admin.quang@gmail.com";

  const appointmentRef = doc(
    db,
    `Appointment/${assignedDoctorEmail}&${clientEmail}`
  );

  // Check if patient has any appointment with the doctor
  getDoc(appointmentRef).then((doc) => {
    if (doc.exists()) {
      alert("You have appointments in the past!");
    } else {
      alert("You never made an appointment with this doctor!");
    }
  });

  return (
    <Box sx={{ flexGrow: 1, color: "var(--text-primary)" }}>
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
    </Box>
  );
};

export default Appointment;
