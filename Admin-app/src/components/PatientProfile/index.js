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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import FlagIcon from "@mui/icons-material/Flag";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPatient,
  togglePriorityFlag,
  toggleReviewed,
} from "../../backend/firebasePatientUtilities";
import DropdownStatus from "./../DropdownStatus";
import DropdownDoctor from "./../DropdownDoctor";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
    TasteLoss
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

  const rows = [
    createData("Jan 25", "No", "Yes", "No", "Yes", "Yes", "No", "No"),
    createData("Jan 26", "No", "Yes", "No", "No", "No", "No", "No"),
  ];

  const { key } = useParams();
  const [priorityFlag, setPriorityFlag] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [checked, setChecked] = useState("");
  const [reviewingStatus, setReviewingStatus] = useState("");

  // Get Patient Info each time page refreshes
  useEffect(() => {
    getPatient(key)
      .then((data) => {
        setPatientInfo(data);
        setPriorityFlag(data.flaggedPriority === "1");
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
                <br></br>Address: {patientInfo && patientInfo.address}
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
                  <Item
                    className="PATIENT-PROFILE__data"
                    sx={{ bgcolor: "inherit", boxShadow: "none" }}
                  >
                    Temperature: {patientInfo && patientInfo.temperature} °C
                  </Item>
                  <Item
                    className="PATIENT-PROFILE__data"
                    sx={{ bgcolor: "inherit", boxShadow: "none" }}
                  >
                    Weight: {patientInfo && patientInfo.weight} lbs
                  </Item>
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
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SYMPTOM DETAILS
            <Button id="addButton">
              <AddCircleIcon
                sx={{ color: "var(--text-primary)" }}
              ></AddCircleIcon>
            </Button>
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
                  align="right"
                >
                  Fever
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="right"
                >
                  Cough
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="right"
                >
                  Runny Nose
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="right"
                >
                  Muscle Ache
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="right"
                >
                  Tiredness
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="right"
                >
                  Smell Loss
                </TableCell>
                <TableCell
                  className="PATIENT-SYMPTOMS__table__header"
                  sx={{ borderColor: "var(--background-secondary)" }}
                  align="right"
                >
                  Taste Loss
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
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
                    align="right"
                  >
                    {row.Fever}
                  </TableCell>
                  <TableCell
                    className="PATIENT-SYMPTOMS__table__data"
                    sx={{ borderColor: "var(--background-secondary)" }}
                    align="right"
                  >
                    {row.Cough}
                  </TableCell>
                  <TableCell
                    className="PATIENT-SYMPTOMS__table__data"
                    sx={{ borderColor: "var(--background-secondary)" }}
                    align="right"
                  >
                    {row.RunnyNose}
                  </TableCell>
                  <TableCell
                    className="PATIENT-SYMPTOMS__table__data"
                    sx={{ borderColor: "var(--background-secondary)" }}
                    align="right"
                  >
                    {row.MuscleAche}
                  </TableCell>
                  <TableCell
                    className="PATIENT-SYMPTOMS__table__data"
                    sx={{ borderColor: "var(--background-secondary)" }}
                    align="right"
                  >
                    {row.Tiredness}
                  </TableCell>
                  <TableCell
                    className="PATIENT-SYMPTOMS__table__data"
                    sx={{ borderColor: "var(--background-secondary)" }}
                    align="right"
                  >
                    {row.SmellLoss}
                  </TableCell>
                  <TableCell
                    className="PATIENT-SYMPTOMS__table__data"
                    sx={{ borderColor: "var(--background-secondary)" }}
                    align="right"
                  >
                    {row.TasteLoss}
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
