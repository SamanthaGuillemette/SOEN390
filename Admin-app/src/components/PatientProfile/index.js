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
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FlagIcon from "@mui/icons-material/Flag";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPatient,
  togglePriorityFlag,
  toggleReviewed,
  getStatuses,
} from "../../backend/firebasePatientUtilities";
import DropdownStatus from "./../DropdownStatus";
import DropdownDoctor from "./../DropdownDoctor";

/**
 * setAge function works for setting the age of the patient
 * @param  {} dobStr
 */
function getAge(dobStr) {
  // First get today's date
  var todaysDate = new Date();

  // Convert date of birth string to a date objects
  var dob = new Date(dobStr);

  // Calculate age based on year alone
  var returnValue = todaysDate.getYear() - dob.getYear();

  // Check month in case it has an effect on the age
  if (dob.getMonth() > todaysDate.getMonth()) {
    returnValue += 1;
  }
  // If dob same month as today, check day in case it has an effect on the age
  else if (
    dob.getMonth() === todaysDate.getMonth() &&
    dob.getDay() > todaysDate.getDay()
  ) {
    returnValue += 1;
  }

  return returnValue;
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
    Weight
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
    };
  }

  // reviewed status with DB
  function onReviewedClick(id) {
    if (checked === true) {
      setReviewingStatus("Not Completed");
      setChecked(false);
    } else {
      setReviewingStatus("Status Reviewed");
      setChecked(true);
    }
    //{patientInfo && patientInfo.statusReview}
    toggleReviewed(id).then((newPatientInfo) => newPatientInfo);
  }

  // priority flag with DB
  function onFlagClick(id) {
    togglePriorityFlag(id).then(
      (newPatientInfo) =>
        newPatientInfo &&
        setPriorityFlag(newPatientInfo.flaggedPriority === "1")
    );
  }

  const { key } = useParams();
  const [priorityFlag, setPriorityFlag] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [patientInfoStatuses, setPatientInfoStatuses] = useState([]);
  const [checked, setChecked] = useState("");
  const [reviewingStatus, setReviewingStatus] = useState("");

  // Get Patient Info each time page refreshes
  useEffect(() => {
    getPatient(key)
      .then((data) => {
        setPatientInfo(data);
        setPriorityFlag(data.flaggedPriority === "1");
        getStatuses(key).then((statuses) => {
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
                  status.weight || ""
                )
              )
            );
        });

        if (
          data.statusReview == null ||
          data.statusReview === "Not Completed"
        ) {
          setChecked(false);
          setReviewingStatus("Not Completed");
        } else {
          setChecked(true);
          setReviewingStatus("Status Reviewed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [key]);

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
              priorityFlag ? "PATIENT__status clicked" : "PATIENT__status__card"
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
                      onFlagClick(key);
                    }}
                    className={
                      priorityFlag
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

          {/* Status review grid */}
          <Grid item xs={6}>
            <Card
              sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography
                    className="PATIENT-STATUS-REVIEW__header"
                    gutterBottom
                    variant="button"
                    component="div"
                  >
                    Status Review
                  </Typography>
                  <Typography
                    className="PATIENT-STATUS-REVIEW__data"
                    variant="body2"
                  >
                    Review Completed: {reviewingStatus}
                    <Checkbox
                      checked={checked}
                      size="small"
                      style={{ color: "var(--text-primary)" }}
                      onClick={() => {
                        onReviewedClick(key);
                      }}
                    />
                  </Typography>
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
                `(NO SYMPTOMS ENTERED YET)`}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {patientInfoStatuses &&
                patientInfoStatuses.map((row) => (
                  <TableRow
                    key={row.Date}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      component="th"
                      scope="row"
                    >
                      {row.Date}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.Fever}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.Cough}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.RunnyNose}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.MuscleAche}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.Tiredness}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.SmellLoss}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.TasteLoss}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.Temperature}
                    </TableCell>
                    <TableCell
                      className="PATIENT-SYMPTOMS__table__data"
                      sx={{ borderColor: "var(--background-secondary)" }}
                      align="center"
                    >
                      {row.Weight}
                    </TableCell>
                  </TableRow>
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
