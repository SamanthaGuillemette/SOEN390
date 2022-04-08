import Box from "@mui/material/Box";
import "./Appointment.css";
import { Button } from "@mui/material";
import DoctorIcon from "../../assets/doctor-icon.svg";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../store/authSlice";
import { useEffect, useState } from "react";
import { selectDoctorInfoDetails } from "../../store/userInfoSlice";

const AppointmentDetails = () => {
  let params = useParams();

  // Get information of the assigned Doctor from Redux store
  const doctorInfoDetails = useSelector(selectDoctorInfoDetails);

  // Get currently logged in user info from Redux store
  const clientEmail = useSelector(selectUserEmail);
  const [appointment, setAppointment] = useState(null);

  // Create a reference to the 'AppointmentHistory' collection
  const appointmentRef = doc(
    db,
    `DoctorPatient/${doctorInfoDetails?.email};${clientEmail}/AppointmentHistory/${params.appointmentId}`
  );

  // This lifecycle function will get the appointment details from the database
  useEffect(() => {
    const getAppointment = async () => {
      const response = await getDoc(appointmentRef);
      setAppointment(response?.data());
    };
    getAppointment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Send "Accept" to confirm appointment
   * @param {ClickEvent} event
   */
  const handleAccept = async (e) => {
    e.preventDefault();

    await updateDoc(appointmentRef, {
      confirmation: true,
    });

    // Refresh page after user submit the form
    window.location.reload();
  };

  /**
   * Send "Decline" to refuse appointment
   * @param {ClickEvent} event
   */
  const handleDecline = async (e) => {
    e.preventDefault();

    await updateDoc(appointmentRef, {
      confirmation: false,
    });

    // Refresh page after user submit the form
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, color: "var(--text-primary)" }}>
      <div className="appointment-topContainer">
        <h1 className="appointment-topTitle">Upcoming Appointment</h1>
        <div className="appointment-quickAccessContainer">
          <div className="appointment-quickAccess_DoctorIcon">
            <img src={DoctorIcon} alt="Doctor Icon" width="50" />
          </div>
          <div className="appointment-quickAccess_InboxButton">
            <Button
              type="submit"
              variant="contained"
              LinkComponent={Link}
              to="/clientinbox"
            >
              Talk to doctor
            </Button>
          </div>
        </div>
      </div>

      <div className="appointment-mainContainer">
        <h2 className="appointment-title">
          Meeting with Dr.{" "}
          {`${doctorInfoDetails?.firstName} ${doctorInfoDetails?.lastName}`}
        </h2>
        <h4 className="appointment-subTitle">Status: </h4>
        <div className="appointment-textContent">
          {appointment?.confirmation ? "Confirmed" : "Not confirmed"}
        </div>
        <h4 className="appointment-subTitle">Description:</h4>
        <div className="appointment-textContent">
          {appointment?.description}
        </div>
        <h4 className="appointment-subTitle">Time: </h4>
        <div className="appointment-textContent">
          {new Date(appointment?.startDate).toDateString()}
        </div>
        <h4 className="appointment-subTitle">Location:</h4>
        <div className="appointment-textContent">{appointment?.location}</div>
        <h4 className="appointment-subTitle">Note: </h4>
        <div className="appointment-textContent">{appointment?.note}</div>

        <div className="appointment-buttonContainer">
          <Button
            type="submit"
            variant="contained"
            className="appointment-acceptButton"
            onClick={handleAccept}
          >
            ACCEPT
          </Button>
          <Button type="submit" variant="outlined" onClick={handleDecline}>
            DECLINE
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default AppointmentDetails;
