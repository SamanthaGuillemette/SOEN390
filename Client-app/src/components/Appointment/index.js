import "./Appointment.css";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useEffect, useState } from "react";
import { selectUserEmail } from "../../store/authSlice";
import Box from "@mui/material/Box";
import AppointmentList from "./AppointmentList";
import { selectDoctorInfoDetails } from "../../store/userInfoSlice";

const Appointment = () => {
  const clientEmail = useSelector(selectUserEmail);
  const doctorInfoDetails = useSelector(selectDoctorInfoDetails);
  const [appointmentList, setAppointmentList] = useState([]);

  // Reference to the 'AppointmentHistory' collection
  const appointmentRef = collection(
    db,
    `DoctorPatient/${doctorInfoDetails?.email};${clientEmail}/AppointmentHistory`
  );

  // Save the list of appointments to 'AppointmentList' in real-time
  useEffect(() => {
    onSnapshot(appointmentRef, (snapshot) => {
      setAppointmentList(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, color: "var(--text-primary)" }}  data-testid="appointment-box">
      {appointmentList.length === 0 ? (
        <h3>You never had an appointment with your doctor</h3>
      ) : (
        <AppointmentList appointments={appointmentList} />
      )}
    </Box>
  );
};

export default Appointment;
