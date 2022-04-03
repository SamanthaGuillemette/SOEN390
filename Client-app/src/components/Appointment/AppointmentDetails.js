import Box from "@mui/material/Box";
import "./Appointment.css";
import { Button } from "@mui/material";
import DoctorIcon from "../../assets/doctor-icon.svg";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../store/authSlice";
import { useEffect, useState } from "react";
import { selectDoctorInfoDetails } from "../../store/userInfoSlice";

const AppointmentDetails = () => {
  let params = useParams();
  const doctorInfoDetails = useSelector(selectDoctorInfoDetails);
  const clientEmail = useSelector(selectUserEmail);
  const [appointment, setAppointment] = useState(null);

  const appointmentRef = doc(
    db,
    `DoctorPatient/${doctorInfoDetails?.email}&${clientEmail}/AppointmentHistory/${params.appointmentId}`
  );

  useEffect(() => {
    const getAppointment = async () => {
      const response = await getDoc(appointmentRef);
      setAppointment(response?.data());
    };
    getAppointment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ flexGrow: 1, color: "var(--text-primary)" }}>
      <div className="appointment-topContainer">
        <h1 className="appointment-topTitle">Upcoming Appointment</h1>
        <div className="appointment-quickAccessContainer">
          <div className="appointment-quickAccess_DoctorIcon">
            <img src={DoctorIcon} alt="Doctor Icon" width="50" />
          </div>
          <div className="appointment-quickAccess_InboxButton">
            <Button type="submit" variant="contained" to="/clientinbox">
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
        <div className="appointment-textContent">{appointment?.startDate}</div>
        <h4 className="appointment-subTitle">Location:</h4>
        <div className="appointment-textContent">{appointment?.location}</div>
        <h4 className="appointment-subTitle">Note: </h4>
        <div className="appointment-textContent">{appointment?.note}</div>

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

export default AppointmentDetails;
