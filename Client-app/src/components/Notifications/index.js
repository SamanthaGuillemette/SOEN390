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
import { Divider } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { db, auth } from "../../backend/firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import "./Notifications.css";

const Notifications = () => {
  const user = auth.currentUser;
  const [value] = useDocumentOnce(doc(db, "Client", user?.email));

  const [displayUpdateNotif, setDisplayUpdateNotif] = useState(false);
  const [displayReviewedNotif, setDisplayReviewedNotif] = useState(false);

  useEffect(() => {
    console.log("worked!");
    if (value && value.data().status === "POSITIVE") {
      setDisplayUpdateNotif(true);
    }
    if (value && value.data().statusReview === "Status Reviewed") {
      setDisplayReviewedNotif(true);
    }
  }, [value]);

  // closing the notification method
  const handleCloseUpdateStatus = () => {
    setDisplayUpdateNotif(false);
  };

  // closing the notification method
  const handleCloseReviewedStatus = () => {
    setDisplayReviewedNotif(false);
  };

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
                  <CloseIcon
                    className="notifications-closeIcon"
                    onClick={handleCloseUpdateStatus}
                  />
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
                <Typography
                  style={{
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                  color="#949be2"
                >
                  1 January, 2022. At 3:20 pm.
                </Typography>
                <Divider color="#949be2" />
              </Box>
            )}
            {displayReviewedNotif && (
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
                    <b>Status Reviewed</b>
                  </Typography>
                  <CloseIcon
                    className="notifications-closeIcon"
                    onClick={handleCloseReviewedStatus}
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
                  1 January, 2022. At 3:20 pm.
                </Typography>
                <Divider color="#949be2" />
              </Box>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Notifications;
