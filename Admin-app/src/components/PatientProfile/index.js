import "./PatientProfile.css";
import * as React from "react";
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
import FlagIcon from '@mui/icons-material/Flag';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from '@mui/material/NativeSelect';
import { getPatient, togglePriorityFlag, useOld } from "../../backend/firebasePatientUtilities";
import DropdownConfirmation from "../DropdownConfirmation/index";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

function PatientProfile()
{
  if (!useOld)
  {
    return PatientProfileNew();
  }
  else
  {
    return PatientProfileOld();
  }
}

function PatientProfileNew() {
  
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

  function onFlagClick(id)
  {
    togglePriorityFlag(id)
    .then((newPatientInfo) => newPatientInfo && setPriorityFlag(newPatientInfo.flaggedPriority === "1"));
  }  

  const rows = [
    createData("Jan 25", "No", "Yes", "No", "Yes", "Yes", "No", "No"),
    createData("Jan 26", "No", "Yes", "No", "No", "No", "No", "No")
  ];
  
  const [priorityFlag, setPriorityFlag] = useState(false);

  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('priorityFlag');
    if (data){
      setPriorityFlag(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('priorityFlag', JSON.stringify(priorityFlag));
  });

    // Get Patient Info each time page refreshes
    useEffect(() => {
      //console.log("id" + id);
      getPatient(id)
        .then((data) => {
          setPatientInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);
  
  return (
    <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
      <Grid item xs={8} lg={4}>
        <Card sx={{background: "var(--gradient-to-right-btm)", borderRadius: "20px"}}>
          <CardActionArea>
            <Avatar
              id="avatar"
              src={patientInfo && patientInfo.profileImage}
            />
            <CardContent>
              <Typography
                className="profile-name"
                gutterBottom
                variant="button"
                fontSize="1.2rem"
                component="div"
              >
                {patientInfo && patientInfo.name}
              </Typography>
              <Typography
                className="avatar-text"
                variant="body2"
              >
                <br></br>Age: {patientInfo && getAge(patientInfo.dob)}
                <br></br>Birthday: {patientInfo && patientInfo.dob}
                <br></br>Address: {patientInfo && patientInfo.address}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid container spacing={2} item rowSpacing={2} direction="column" xs={6.51}>
        <Grid item>
          <Card sx={{bgcolor: "var(--background-main)", borderRadius:"20px"}} className={priorityFlag ? "status-card clicked" : "status-card"}>
            <CardActionArea>
              <CardContent>
                <Typography className="header" gutterBottom variant="button" component="div">
                  Status  <FlagIcon onClick={() => { (  onFlagClick(id));}}
                  className={priorityFlag ? "priority-flag clicked" : "priority-flag"}>
                  </FlagIcon>
                  <br></br>
                  <br></br>
                </Typography>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" />}
                      spacing={1}
                      alignItems="baseline"
                    >
                      <DropdownConfirmation className="profile-data"></DropdownConfirmation>
                      <span className={
                        patientInfo && patientInfo.status === "POSITIVE"
                          ? "label-positive"
                          : "label-negative"
                      }>{patientInfo && patientInfo.status}</span>
                      <Item className="profile-data" sx={{ bgcolor: "inherit", boxShadow: "none" }}>Temperature: {patientInfo && patientInfo.temperature} °C</Item>
                      <Item className="profile-data" sx={{ bgcolor: "inherit", boxShadow: "none" }}>Weight: {patientInfo && patientInfo.weight} lbs</Item>
                    </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid container spacing={2} item rowSpacing={2} direction="row">
          <Grid item xs={6}>
            <Card sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}>
              <CardActionArea>
                <CardContent>
                  <Typography className="header" gutterBottom variant="button" component="div">
                    Assigned Doctor
                  </Typography>
                  <Typography className="profile-data" variant="body2">
                    Name: {patientInfo && patientInfo.assignedDoctor}
                    <Checkbox size="small" style={{ color: "var(--text-primary)" }}/>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}>
              <CardActionArea>
                <CardContent>
                  <Typography className="header" gutterBottom variant="button" component="div">
                    Status Review
                  </Typography>
                  <Typography className="profile-data" variant="body2">
                    Review Completed: <Checkbox size="small" style={{ color: "var(--text-primary)" }}/>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={10.51}>
        <TableContainer sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }} component={Paper}>
          <h5 className="symptomsTitle">
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SYMPTOM DETAILS
            <Button id="addButton"><AddCircleIcon sx={{ color: "var(--text-primary)" }}></AddCircleIcon></Button>
          </h5>
          <Table sx={{ minWidth: 650 }} aria-label="collapsable table">
            <TableHead>
              <TableRow>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }}>Date</TableCell>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }} align="right">Fever</TableCell>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }} align="right">Cough</TableCell>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }} align="right">Runny Nose</TableCell>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }} align="right">Muscle Ache</TableCell>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }} align="right">Tiredness</TableCell>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }} align="right">Smell Loss</TableCell>
                <TableCell className="header" sx={{ borderColor: "var(--background-secondary)" }} align="right">Taste Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.Date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} component="th" scope="row">
                    {row.Date}
                  </TableCell>
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} align="right">{row.Fever}</TableCell>
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} align="right">{row.Cough}</TableCell>
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} align="right">{row.RunnyNose}</TableCell>
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} align="right">{row.MuscleAche}</TableCell>
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} align="right">{row.Tiredness}</TableCell>
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} align="right">{row.SmellLoss}</TableCell>
                  <TableCell className="data" sx={{ borderColor: "var(--background-secondary)" }} align="right">{row.TasteLoss}</TableCell>
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


function PatientProfileOld() {
  
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

  const rows = [
    createData("Jan 25", "No", "Yes", "No", "Yes", "Yes", "No", "No"),
    createData("Jan 26", "No", "Yes", "No", "No", "No", "No", "No")
  ];
  
  const [priorityFlag, setPriorityFlag] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('priorityFlag');
    if (data){
      setPriorityFlag(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('priorityFlag', JSON.stringify(priorityFlag));
  });

  
  return (
    <Grid container spacing={2} maxWidth="lg" alignItems="flex-end">
      <Grid item xs={8} lg={4}>
        <Card>
          <CardActionArea>
            <Avatar
              id="avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg"
            />
            <CardContent>
              <Typography
                className="profile-name"
                gutterBottom
                variant="button"
                fontSize="1.2rem"
                component="div"
              >
                John Doe
              </Typography>
              <Typography
                className="text"
                variant="body2"
                color="text.secondary"
              >
                <br></br>Age: 50
                <br></br>Birthday: 1 July 1971
                <br></br>Address: 101 Brooke, Montreal L5L 9T9
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid container spacing={2} item rowSpacing={2} direction="column" xs={6.1}>
        <Grid item>
          <Card className={priorityFlag ? "status-card clicked" : "status-card"}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="button" component="div">
                  Status  <FlagIcon onClick={() => {priorityFlag ? setPriorityFlag(false) : setPriorityFlag(true)}}
                  className={priorityFlag ? "priority-flag clicked" : "priority-flag"}>
                  </FlagIcon>
                  <br></br>
                  <br></br>
                </Typography>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" />}
                      spacing={1}
                      alignItems="baseline"
                    >
                      
                      <FormControl sx={{width: 115}} >
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Confirmation
                        </InputLabel>
                        <NativeSelect
                          size="small"
                          defaultValue={20}
                          inputProps={{
                            name: 'confirmation',
                            id: 'uncontrolled-native',
                          }}>
                          <option value={10}>Confirmed</option>
                          <option value={20}>Unconfirmed</option>
                        </NativeSelect>
                      </FormControl>
                      <span className="label-positive">positive</span>
                      <Item>Temperature: 39 °C</Item>
                      <Item>Weight: 150 lbs</Item>
                    </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid container spacing={2} item rowSpacing={2} direction="row">
          <Grid item xs={6}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="button" component="div">
                    Assigned Doctor
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Name: Michael Scott
                    <Checkbox size="small" style ={{color: "white"}}/>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="button" component="div">
                    Status Review
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Review Completed: <Checkbox size="small"/>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} lg={10.1}>
        <TableContainer component={Paper}>
          <h5>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SYMPTOM DETAILS
            <Button id="add-button"><AddCircleIcon></AddCircleIcon></Button>
          </h5>
          <Table sx={{ minWidth: 650 }} aria-label="collapsable table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Fever</TableCell>
                <TableCell align="right">Cough</TableCell>
                <TableCell align="right">Runny Nose</TableCell>
                <TableCell align="right">Muscle Ache</TableCell>
                <TableCell align="right">Tiredness</TableCell>
                <TableCell align="right">Smell Loss</TableCell>
                <TableCell align="right">Taste Loss</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.Date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Date}
                  </TableCell>
                  <TableCell align="right">{row.Fever}</TableCell>
                  <TableCell align="right">{row.Cough}</TableCell>
                  <TableCell align="right">{row.RunnyNose}</TableCell>
                  <TableCell align="right">{row.MuscleAche}</TableCell>
                  <TableCell align="right">{row.Tiredness}</TableCell>
                  <TableCell align="right">{row.SmellLoss}</TableCell>
                  <TableCell align="right">{row.TasteLoss}</TableCell>
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