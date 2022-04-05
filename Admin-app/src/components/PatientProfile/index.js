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
import { CardActionArea } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import FlagIcon from "@mui/icons-material/Flag";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPatient,
  togglePriorityFlag,
  getStatuses,
} from "../../backend/firebasePatientUtilities";
import DropdownStatus from "./../DropdownStatus";
import DropdownDoctor from "./../DropdownDoctor";
import SymptomsRow from "./SymptomsRow";
import { db } from "../../backend/firebase";
import { doc, serverTimestamp, addDoc, collection } from "firebase/firestore";

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

  // reviewed status with DB
  function onReviewedClick() {
    if (patientInfo.reviewed !== false) {
      addStatusReviewedNotif();
    }
  }

  // priority flag with DB
  function onFlagClick() {
    togglePriorityFlag(key).then((newPatientInfo) =>
      setPatientInfo(newPatientInfo)
    );
  }

  const { key } = useParams();
  const [patientInfo, setPatientInfo] = useState(null);
  const [patientInfoStatuses, setPatientInfoStatuses] = useState([]);

  // Get Patient Info each time page refreshes
  useEffect(() => {
    getPatient(key)
      .then((data) => {
        setPatientInfo(data);
        getStatuses(key, false).then((statuses) => {
          statuses &&
            setPatientInfoStatuses(
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [key]);

  // This function will add notifications to the client's doc if status is reviewed
  const addStatusReviewedNotif = async () => {
    const clientRef = doc(db, `Client/${key}`);
    const notifRef = collection(clientRef, "reviewNotification");
    await addDoc(notifRef, {
      notif: "Status Reviewed",
      timestamp: serverTimestamp(),
      seen: "False",
    });
  };

  return (
    <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
      {/* Avatar grid */}
      <Grid item xs={8} lg={4}>
        <Card
          data-testid="card-1"
          sx={{
            background: "var(--gradient-to-right-btm)",
            borderRadius: "20px",
          }}
        >
          <CardActionArea>
            <Avatar id="avatar" src={patientInfo && patientInfo.profileImage} />
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
                <br></br>Age: {patientInfo && getAge(patientInfo.dob)}
                <br></br>Birthday: {patientInfo && patientInfo.dob}
                <br></br>Address:{" "}
                {patientInfo &&
                  patientInfo.address &&
                  patientInfo.city &&
                  patientInfo.province &&
                  patientInfo.postalCode &&
                  `${patientInfo.address}, ${patientInfo.city}, ${patientInfo.province}, ${patientInfo.postalCode}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid
        container
        spacing={2}
        item
        rowSpacing={2}
        direction="column"
        xs={6.51}
      >
        {/* Status grid */}
        <Grid item>
          {/* Changing status card color according to priority flag */}
          <Card
            data-testid="card-2"
            sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
            className={
              patientInfo && patientInfo.flaggedPriority === "1"
                ? "PATIENT__status clicked"
                : "PATIENT__status__card"
            }
          >
            <CardActionArea>
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
                  ></FlagIcon>
                  <br></br>
                  <br></br>
                </Typography>
                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" />}
                  spacing={1}
                  alignItems="baseline"
                >
                  <DropdownStatus patientInfo={patientInfo} />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid container spacing={2} item rowSpacing={2} direction="row">
          {/* Assigned doctor grid */}
          <Grid item xs={6}>
            <Card
              data-testid="card-3"
              sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
            >
              <CardActionArea>
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
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Symptom details table */}
      <Grid item xs={12} lg={10.51}>
        <TableContainer
          data-testid="table-1"
          sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
          component={Paper}
        >
          <h5 className="PATIENT-SYMPTOMS__table__label">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS DETAILS{" "}
            <h5 className="PATIENT-SYMPTOMS__table__label__no-data">
              {patientInfoStatuses &&
                patientInfoStatuses.length === 0 &&
                `(NO STATUSES ENTERED YET)`}
            </h5>
          </h5>
          <Table sx={{ minWidth: 650 }} aria-label="collapsable table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                >
                  Date
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Fever
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Cough
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Runny Nose
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Muscle Ache
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Sore Throat
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Smell Loss
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Taste Loss
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Temperature (&deg;C)
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="center"
                >
                  Weight (lb)
                </TableCell>
                <TableCell
                  sx={{ borderColor: "var(--background-secondary)" }}
                  className="PATIENT__table__header"
                  align="center"
                >
                  Reviewed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientInfoStatuses &&
                patientInfoStatuses.map((row) => (
                  <SymptomsRow key={row.id} row={row} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <br />
      </Grid>
    </Grid>
  );
}

export default PatientProfile;
