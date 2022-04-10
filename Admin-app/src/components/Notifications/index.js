/**
 * @fileoverview This component takes care of the Notifications function.
 *
 */
import "./Notifications.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getPatients,
  viewedNewCase,
  getStatuses,
  getPatient,
} from "../../backend/firebasePatientUtilities";
import { getDoctor } from "../../backend/firebaseDoctorUtilities";
import { Link } from "react-router-dom";

/**
 * This component is what makes the data for each notification
 */
function createData(email, patientName, timestamp, reviewed, newCase) {
  return { email, patientName, timestamp, reviewed, newCase };
}

/**
 * This component is what allows the Notifications feature to work.
 */
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    /* This portion of code gets the status notifications and appends to the const notifications */
    getDoctor(userEmail)
      .then((patientInfo) => {
        patientInfo.treats.map(
          (
            patientEmail // mapping through the doctor's patients
          ) =>
            getPatient(patientEmail).then(
              (
                patient // getting the data per patient
              ) =>
                getStatuses(patientEmail, false).then((statuses) => {
                  // getting the status per patient
                  statuses &&
                    statuses.map((status) =>
                      status.reviewed !== true // if it hasnt been reviewed
                        ? setNotifications((state) => [
                            // then appending
                            ...state,
                            createData(
                              patientEmail,
                              patient.firstName + " " + patient.lastName,
                              status?.timestamp || "",
                              status.reviewed,
                              false
                            ),
                          ])
                        : ""
                    );
                })
            )
        );
      })
      .catch((err) => {
        console.log(err);
      });

    /* This portion of code gets the new case notifications and appends to the const notifications */
    getPatients()
      .then((data) => {
        data.forEach((doc) => {
          // if newCase is true and viewCase is not true
          if (doc.newCase && !doc.viewedCase) {
            setNotifications((state) => [...state, doc]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  // sorting based on increasing timestamp
  notifications.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
  );

  return (
    <>
      <div className="ADMIN-NOTIFICATIONS__container">
        <Card className="ADMIN-NOTIFICATIONS__box">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              p: "30px",
              mb: "20px",
            }}
          >
            <Typography
              sx={{
                mx: "30px",
                pb: "30px",
                fontWeight: "800",
              }}
              color="var(--text-primary)"
              variant="h5"
            >
              Notifications
            </Typography>
            {notifications.length > 0 &&
              notifications.map((notification) =>
                notification.newCase === false ? (
                  <Box>
                    <Box>
                      <Box
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <CheckCircleIcon
                          color="success"
                          sx={{ fontSize: 40 }}
                        />
                        <Typography
                          style={{
                            marginLeft: "10px",
                          }}
                          color="var(--text-primary)"
                        >
                          <b>Status Update</b>
                        </Typography>
                      </Box>
                      <Typography
                        style={{
                          marginLeft: "50px",
                          marginBottom: "20px",
                        }}
                        color="var(--text-primary)"
                      >
                        {`${notification.patientName} updated their status. Please check
                  the status update for more information.`}
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: "50px",
                          marginBottom: "30px",
                        }}
                        color="#949be2"
                        data-testid="notification-statusUpdate"
                      >
                        {notification.timestamp?.toDate()?.toLocaleString()}
                      </Typography>
                      <Link
                        style={{
                          marginLeft: "50px",
                        }}
                        to={`/patientprofile/${notification.email}`}
                      >
                        <strong> Click here to display the profile. </strong>
                      </Link>
                      <Typography
                        style={{
                          marginLeft: "50px",
                          marginBottom: "30px",
                        }}
                        color="#949be2"
                      ></Typography>
                      <Divider color="#949be2" />
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box>
                      <Box
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <CoronavirusIcon color="error" sx={{ fontSize: 40 }} />
                        <Typography
                          style={{
                            marginLeft: "10px",
                          }}
                          color="var(--text-primary)"
                        >
                          <b>New Case Reported</b>
                        </Typography>
                      </Box>
                      <Typography
                        style={{
                          marginLeft: "50px",
                          marginBottom: "30px",
                        }}
                        color="var(--text-primary)"
                      >
                        {`${notification.firstName} ${notification.lastName} was tested positive, please check the
                    patient's information and status for more information.`}
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: "50px",
                          marginBottom: "30px",
                        }}
                        color="#949be2"
                        data-testid="notification-statusUpdate"
                      >
                        {notification.timestamp?.toDate()?.toLocaleString()}
                      </Typography>
                      <Link
                        style={{
                          marginLeft: "50px",
                        }}
                        onClick={(e) => viewedNewCase(notification.email)}
                        to={`/patientprofile/${notification.email}`}
                      >
                        <strong> Click here to display the profile. </strong>
                      </Link>
                      <Typography
                        style={{
                          marginLeft: "50px",
                          marginBottom: "30px",
                        }}
                        color="#949be2"
                      ></Typography>
                      <Divider color="#949be2" />
                    </Box>
                  </Box>
                )
              )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Notifications;
