/**
 * @fileoverview This component takes care of the PatientProfile function.
 *
 */
import "./PatientProfile.css";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FlagIcon from "@mui/icons-material/Flag";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPatient,
  togglePriorityFlag,
  getStatuses,
  getDiary,
} from "../../backend/firebasePatientUtilities";
import DropdownStatus from "./../DropdownStatus";
import DropdownDoctor from "./../DropdownDoctor";
import DiaryList from "./DiaryList";
import StatusList from "./StatusList";

/**
 * setAge function works for setting the age of the patient
 * @param  {} dobStr
 */
function getAge(dobStr) {
  var todaysDate = new Date(); // First get today's date
  var dob = new Date(dobStr); // Convert date of birth string to a date objects

  var ageNow = todaysDate.getFullYear() - dob.getFullYear(); // storing age
  var m = todaysDate.getMonth() - dob.getMonth(); // storing month

  if (m < 0 || (m === 0 && todaysDate.getDate < dob.getDate())) {
    ageNow -= 1; // decreasing age
  }

  if (ageNow < 0) {
    // if negative value
    return 0; // return 0
  } else {
    return ageNow; // returning
  }
}

/**
 * This component is what allows the chatting feature to work. Below are many consts and
 * useEffect hooks that communicate with the database in order to recieve or send
 * information about the patient profile.
 */
function PatientProfile() {
  // Creating data for symptom details table
  function createData(
    Date,
    Fever,
    Cough,
    RunnyNose,
    MuscleAche,
    Tiredness,
    SmellLoss,
    TasteLoss,
    Temperature,
    Weight,
    reviewed,
    docID
  ) {
    return {
      Date,
      Fever,
      Cough,
      RunnyNose,
      MuscleAche,
      Tiredness,
      SmellLoss,
      TasteLoss,
      Temperature,
      Weight,
      reviewed,
      docID,
    };
  }

  function createDiaryData(DateDiary, Description, Location, PostalCode) {
    return { DateDiary, Description, Location, PostalCode };
  }

  // priority flag with DB
  function onFlagClick() {
    togglePriorityFlag(key).then((newPatientInfo) =>
      setPatientInfo(newPatientInfo)
    );
  }

  const { key } = useParams();
  const [patientInfo, setPatientInfo] = useState(null);
  const [patientStatuses, setPatientStatuses] = useState([]);
  const [patientDiaries, setPatientDiaries] = useState([]);

  // Get Patient Info each time page refreshes
  useEffect(() => {
    getPatient(key)
      .then((data) => {
        setPatientInfo(data);
        getStatuses(key, false).then((statuses) => {
          statuses &&
            setPatientStatuses(
              statuses.map((status) =>
                createData(
                  status?.timestamp?.toDate()?.toLocaleString() || "",
                  status.fever || "No",
                  status.cough || "No",
                  status.runnyNose || "No",
                  status.muscleAche || "No",
                  status.soreThroat || "No",
                  status.smellLoss || "No",
                  status.tasteLoss || "No",
                  status.temperature || "",
                  status.weight || "",
                  status.reviewed,
                  status.id
                )
              )
            );
        });
        getDiary(key, false).then((diaries) => {
          diaries &&
            setPatientDiaries(
              diaries.map((diary) =>
                createDiaryData(
                  diary?.timestamp?.toDate()?.toLocaleString() || "",
                  diary.description || "",
                  diary.location || "",
                  diary.postalCode || ""
                )
              )
            );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [key]);

  // Get Diary entries of Patient

  return (
    <Grid
      container
      spacing={2}
      maxWidth="lg"
      alignItems="flex-end"
      justifyContent="center"
    >
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "var(--background-main)",
          mt: 4,
          ml: 2,
          borderRadius: "20px",
        }}
        className="PATIENT-profile__info__grid"
        xs={12}
        item
        data-testid="profile-info"
      >
        {/* Avatar grid */}
        <Avatar id="avatar" src={patientInfo && patientInfo.profileImage} />
        <Grid
          container
          spacing={2}
          item
          rowSpacing={2}
          direction="column"
          xs={6.51}
        >
          {/* Patient Information */}
          <CardContent>
            <Typography
              className="PATIENT-profile__name"
              gutterBottom
              variant="button"
              fontSize="1.2rem"
              component="div"
            >
              {patientInfo &&
                `${patientInfo.firstName} ${patientInfo.lastName}`}
            </Typography>
            <Typography className="PATIENT-profile__info" variant="body2">
              Age:{" "}
              <Typography className="PATIENT-profile__info__data">
                {patientInfo && getAge(patientInfo.dob)}
              </Typography>
              <br />
              <br></br>Birthday:{" "}
              <Typography className="PATIENT-profile__info__data">
                {patientInfo && patientInfo.dob}
              </Typography>
              <br />
              <br></br>Address:{" "}
              <Typography className="PATIENT-profile__info__data">
                {patientInfo &&
                  patientInfo.address &&
                  patientInfo.city &&
                  patientInfo.province &&
                  patientInfo.postalCode &&
                  `${patientInfo.address}, ${patientInfo.city}, ${patientInfo.province}, ${patientInfo.postalCode}`}
              </Typography>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        item
        rowSpacing={2}
        direction="row"
        justifyContent="center"
      >
        {/* Assigned doctor grid */}
        <Grid item xs={6}>
          <Card
            data-testid="card-2"
            sx={{
              bgcolor: "var(--background-main)",
              borderRadius: "20px",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                className="ASSIGNED-DOC__header"
                gutterBottom
                variant="button"
                component="div"
              >
                Assigned Doctor
              </Typography>
              <Typography className="ASSIGNED-DOC__name" variant="body2">
                {" "}
                Name:{" "}
              </Typography>
              <DropdownDoctor patientInfo={patientInfo} />
            </CardContent>
          </Card>
        </Grid>

        {/* Status grid */}
        <Grid item xs={6}>
          <Card
            data-testid="card-3"
            sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
            className={
              patientInfo && patientInfo.flaggedPriority === "1"
                ? "PATIENT__status clicked"
                : "PATIENT__status__card"
            }
          >
            <CardContent>
              <Typography
                className="STATUS-CARD__header"
                gutterBottom
                variant="button"
                component="div"
              >
                {/* Changing flag color when clicked */}
                Status{" "}
                <FlagIcon
                  onClick={() => {
                    onFlagClick();
                  }}
                  className={
                    patientInfo && patientInfo.flaggedPriority === "1"
                      ? "PATIENT__priority-flag clicked"
                      : "PATIENT__priority-flag"
                  }
                />
              </Typography>
              <DropdownStatus patientInfo={patientInfo} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Symptom details table */}
      <Grid item xs={12}>
        <StatusList patientStatuses={patientStatuses} />
      </Grid>
      {/* Diary details table */}
      <Grid item xs={12}>
        <DiaryList patientDiaries={patientDiaries} />
      </Grid>
    </Grid>
  );
}

export default PatientProfile;
