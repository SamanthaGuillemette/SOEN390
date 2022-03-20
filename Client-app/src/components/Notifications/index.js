/**
 * @fileoverview This component displays & handles the notifications.
 *
 */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Divider } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useEffect, useState, useRef } from "react";
import { db, auth } from "../../backend/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  doc,
  serverTimestamp,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import "./Notifications.css";

const Notifications = () => {

  const [user] = useAuthState(auth);

  const schedule = require('node-schedule');
  const rule = new schedule.RecurrenceRule();

  rule.dayOfWeek = [0, new schedule.Range(0, 7)];
  rule.hour = 23;
  rule.minute = 59;

  const job = schedule.scheduleJob(rule, function () {
    console.log('The time is 11:59');
  });

  // const clientRef = doc(db, `Client/${user?.email}`);
  // const postalcodeRef = collection(clientRef, "postalCode");

  return (
    <>
      <div className="notifications-container ">
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
                    <b>Potential Exposures</b>
                  </Typography>
                  <CloseIcon className="notifications-closeIcon" />
                </Box>
                <Typography
                  style={{
                    marginLeft: "50px",
                    marginBottom: "20px",
                  }}
                  color="var(--text-primary)"
                >
                  Based on the address information you have provied, you have
                  been near someone in the past 14 days who tested positive for
                  COVID-19.
                </Typography>
                <Typography
                  style={{
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                  color="#949be2"
                >
                  22 March, 2022. At 5:50 pm.
                </Typography>
                <Divider color="#949be2" />
              </Box>
            </Box>
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
                  <CoronavirusIcon color="success" sx={{ fontSize: 40 }} />
                  <Typography
                    style={{
                      marginLeft: "10px",
                    }}
                    color="var(--text-primary)"
                  >
                    <b>No Exposure Detected</b>
                  </Typography>
                  <CloseIcon className="notifications-closeIcon" />
                </Box>
                <Typography
                  style={{
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                  color="var(--text-primary)"
                >
                  Based on the address information you have provied, you have
                  not been near anyone who reported a COVID-19 diagnosis through
                  this app.
                </Typography>
                <Typography
                  style={{
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                  color="#949be2"
                >
                  22 January, 2022. At 4:20 pm.
                </Typography>
                <Divider color="#949be2" />
              </Box>
            </Box>
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
                    <b>Status Reviewed</b>
                  </Typography>
                  <CloseIcon className="notifications-closeIcon" />
                </Box>
                <Typography
                  style={{
                    marginLeft: "50px",
                    marginBottom: "30px",
                  }}
                  color="var(--text-primary)"
                >
                  Your status has been reviewed by your doctor, please check
                  your inbox for more information.
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
              <Box>
                <Box style={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
                >
                  <ModeEditIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography
                    style={{
                      marginLeft: '10px',
                    }}
                    color="var(--text-primary)"
                  >
                    <b>Status Update Reminder</b>
                  </Typography>
                  <CloseIcon className="notifications-closeIcon" />
                </Box>
                <Typography
                  style={{
                    marginLeft: '50px',
                    marginBottom: '30px'
                  }}
                  color="var(--text-primary)"
                >
                  How are you feeling today? Please update your symptoms list for today.
                </Typography>
                <Typography
                  style={{
                    marginLeft: '50px',
                    marginBottom: '30px'
                  }}
                  color="#949be2"
                >
                  1 January, 2022. At 3:20 pm.
                </Typography>
                <Divider color="#949be2" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Notifications;
