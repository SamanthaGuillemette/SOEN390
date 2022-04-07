/**
 * @fileoverview This component displays & handles the notifications.
 *
 */
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Divider } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { db, auth } from "../../backend/firebase";
import {
  setSeen,
  setSeenExposure,
} from "../../backend/firebasePatientUtilities.js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import "./Notifications.css";
/**
 * This function will display the notifications for the client
 * if their status is reviewed or if they have been tested positive.
 */
const Notifications = () => {
  const user = auth.currentUser;
  const [value] = useDocumentOnce(doc(db, "Client", user?.email));

  // Querying the unseen notifications
  const clientRef = doc(db, `Client/${user?.email}`);
  const statusNotifRef = collection(clientRef, "reviewNotification");
  const q = query(statusNotifRef, where("seen", "==", "False"));

  const exposureNotifRef = collection(clientRef, "exposureNotification");
  const qExposure = query(exposureNotifRef, where("seen", "==", "False"));

  // Declaring constants to display notifications
  const [displayUpdateNotif, setDisplayUpdateNotif] = useState(false);
  const [displayReviewedNotif, setDisplayReviewedNotif] = useState([]);
  const [exposeNotif, setExposeNotif] = useState([]);

  useEffect(() => {
    if (value && value.data().status === "POSITIVE") {
      setDisplayUpdateNotif(true);
    }
    // Getting all reviewed notifications
    onSnapshot(q, (doc) => {
      setDisplayReviewedNotif(
        doc.docs.map((doc) => ({
          id: doc.id,
          notif: doc.data().notif,
          seen: doc.data().seen,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    // Getting all exposure notifications
    onSnapshot(qExposure, (doc) => {
      setExposeNotif(
        doc.docs.map((doc) => ({
          id: doc.id,
          notif: doc.data().notif,
          seen: doc.data().seen,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  }, [value]);

  // sorting based on increasing timestamp
  displayReviewedNotif.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
  );
  exposeNotif.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
  );

  return (
    <>
      <div className="notifications-container">
        <Card className="notifications-box">
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
                pb: "30px",
                fontWeight: "800",
              }}
              color="var(--text-primary)"
              variant="h5"
            >
              Notifications
            </Typography>
            {displayUpdateNotif && (
              <Box>
                <Box
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <ModeEditIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography
                    style={{
                      marginLeft: "10px",
                    }}
                    color="var(--text-primary)"
                  >
                    <b>Status Update Reminder</b>
                  </Typography>
                  <PushPinIcon className="notifications-pinIcon" />
                </Box>
                <Typography
                  style={{
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                  color="var(--text-primary)"
                >
                  How are you feeling today? Please update your symptoms list
                  for today.
                </Typography>
                <Divider color="#949be2" />
              </Box>
            )}
            {displayReviewedNotif &&
              displayReviewedNotif.map((notification) => (
                <Box key={notification.id}>
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
                      <b>Status Reviewed</b>
                    </Typography>
                    <CloseIcon
                      className="notifications-closeIcon"
                      onClick={(e) => setSeen(user?.email, notification.id)}
                    />
                  </Box>
                  <Typography
                    style={{
                      marginLeft: "50px",
                      marginBottom: "30px",
                    }}
                    color="var(--text-primary)"
                  >
                    Your status has been reviewed by your doctor{" "}
                    {value && value.data().assignedDoctor}, please check your
                    inbox for more information.
                  </Typography>
                  <Typography
                    style={{
                      marginLeft: "50px",
                      marginBottom: "30px",
                    }}
                    color="#949be2"
                  >
                    {notification.timestamp.toDate().toLocaleString()}
                  </Typography>
                  <Divider color="#949be2" />
                </Box>
              ))}
            {exposeNotif &&
              exposeNotif.map((notification) => (
                <Box>
                  <Box key={notification.id}>
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
                        <b>Potential Exposures</b>
                      </Typography>
                      <CloseIcon
                        className="notifications-closeIcon"
                        onClick={(e) =>
                          setSeenExposure(user?.email, notification.id)
                        }
                      />
                    </Box>
                    <Typography
                      style={{
                        marginLeft: "50px",
                        marginBottom: "20px",
                      }}
                      color="var(--text-primary)"
                    >
                      Based on the address information you have provied, you
                      have been near someone in the past 14 days who tested
                      positive for COVID-19.
                    </Typography>
                    <Typography
                      style={{
                        marginLeft: "50px",
                        marginBottom: "30px",
                      }}
                      color="#949be2"
                    >
                      {notification.timestamp.toDate().toLocaleString()}
                    </Typography>
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
