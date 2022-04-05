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
// Creating data for symptom details table
function createData(email, patientName, timestamp, reviewed) {
  return { email, patientName, timestamp, reviewed };
}

/**
 * This component is what allows the Notifications feature to work.
 */
const Notifications = () => {
  const [statusNotifications, setStatusNotifications] = useState([]);
  const [newCasePatients, setNewCasePatients] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    getDoctor(userEmail)
      .then((patientInfo) => {
        patientInfo.treats.map((patientEmail) =>
          getPatient(patientEmail).then((patient) =>
            getStatuses(patientEmail, false).then((statuses) => {
              statuses &&
                setStatusNotifications(
                  statuses.map((status) =>
                    createData(
                      patientEmail,
                      patient.firstName + " " + patient.lastName,
                      status?.timestamp?.toDate()?.toLocaleString() || "",
                      status.reviewed
                    )
                  )
                );
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  // getting the patient's with new case
  useEffect(() => {
    getPatients().then((data) => {
      let results = [];
      data.forEach((doc) => {
        // if newCase is true and viewCase is not true
        if (doc.newCase && !doc.viewedCase) {
          results.push(doc);
        }
      });
      setNewCasePatients(results);
    });
  }, []);

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
            {statusNotifications.map((notification) =>
              notification.reviewed !== true ? (
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
                      <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
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
                      {notification.timestamp}
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
                ""
              )
            )}{" "}
            {newCasePatients.map((patient) => (
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
                    {`${patient.firstName} ${patient.lastName} was tested positive, please check the
                    patient's information and status for more information.`}
                  </Typography>
                  <Link
                    style={{
                      marginLeft: "50px",
                    }}
                    onClick={(e) => viewedNewCase(patient.email)}
                    to={`/patientprofile/${patient.email}`}
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
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Notifications;
