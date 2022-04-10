/**
 * @fileoverview This file contains the function for the DashboardStats
 */

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PersonIcon from "@mui/icons-material/Person";
import SmallStatBox from "../../components/SmallStatBox";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { getPatients } from "../../backend/firebasePatientUtilities";
import { getDoctors } from "../../backend/firebaseDoctorUtilities";
import { useEffect, useState } from "react";

function DashboardStats() {
  const [activeCases, setActiveCases] = useState(0);
  const [patientNum, setPatientNum] = useState(0);
  const [doctorNum, setDoctorNum] = useState(0);
  const [recoveredCases, setRecoveredCases] = useState(0);

  /* Counting the number of patients with Positive status */
  useEffect(() => {
    getPatients().then((data) => {
      data.forEach((doc) => {
        if (doc.status === "POSITIVE") {
          setActiveCases((activeCases) => activeCases + 1);
        }
      });
    });
  }, []);

  /* Counting the number of patients with recovered as "true" */
  useEffect(() => {
    getPatients().then((data) => {
      data.forEach((doc) => {
        if (doc.recovered === "true") {
          setRecoveredCases((recoveredCases) => recoveredCases + 1);
        }
      });
    });
  }, []);

  /* Getting the number of Patients */
  getPatients().then((snapshot) => {
    setPatientNum(snapshot.length);
  });

  /* Getting the number of Doctors */
  getDoctors().then((snapshot) => {
    setDoctorNum(snapshot.length);
  });

  return (
    <Grid container spacing={3} className="STAT__container">
      <Grid item xs={6} md={3}>
        <Card
          data-testid="stat_numOfPatients"
          className="STAT_item"
          sx={{
            backgroundColor: "var(--background-main)",
            color: "var(--text-inactive)",
          }}
        >
          <SmallStatBox
            icon={
              <PersonIcon
                fontSize="large"
                sx={{ color: "var(--text-primary)" }}
              />
            }
            number={patientNum}
            description="Patients"
          />
        </Card>
      </Grid>
      {/* This button is for the doctors*/}
      <Grid item xs={6} md={3}>
        <Card
          data-testid="stat_numOfDoctors"
          className="STAT_item"
          sx={{
            backgroundColor: "var(--background-main)",
            color: "var(--text-inactive)",
          }}
        >
          <SmallStatBox
            icon={
              <SupervisedUserCircleIcon
                fontSize="large"
                sx={{ color: "var(--text-primary)" }}
              />
            }
            number={doctorNum}
            description="Doctors"
          />
        </Card>
      </Grid>
      {/* This button is for the active cases*/}
      <Grid item xs={6} md={3}>
        <Card
          data-testid="stat_numOfActiveCases"
          className="STAT_item"
          sx={{
            backgroundColor: "var(--background-main)",
            color: "var(--text-inactive)",
          }}
        >
          <SmallStatBox
            icon={
              <CoronavirusIcon
                fontSize="large"
                sx={{ color: "var(--text-primary)" }}
              />
            }
            number={activeCases}
            description="Active cases"
          />
        </Card>
      </Grid>
      {/* This button is for the recovered cases*/}
      <Grid item xs={6} md={3}>
        <Card
          data-testid="stat_numOfRecoveredCases"
          className="STAT_item"
          sx={{
            backgroundColor: "var(--background-main)",
            color: "var(--text-inactive)",
          }}
        >
          <SmallStatBox
            icon={
              <VerifiedUserIcon
                fontSize="large"
                sx={{ color: "var(--text-primary)" }}
              />
            }
            number={recoveredCases}
            description="Recovered"
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default DashboardStats;
