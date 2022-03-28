/**
 * @fileoverview This class contains the component for displaying the add status modal.
 */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from "react-redux";
import { db } from "../../backend/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

const style = {
  position: "absolute",
  top: "49%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--background-secondary)",
  width: "51vh",
  height: "76vh",
  p: 4,
  borderRadius: "10px",
};

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
    },
  },
});

// This const does styling of the empty input field helper text
const helperTextStyles = makeStyles(theme => ({
  root: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: "#d93025",
      fontSize: "12px",
    }
  }
}));

export default function SimpleModal() {
  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector((state) => state.auth.userEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);

  const [openModal, setOpenModal] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [fever, setFever] = useState(false);
  const [soreThroat, setSoreThroat] = useState(false);
  const [cough, setCough] = useState(false);
  const [runnyNose, setRunnyNose] = useState(false);
  const [smellLoss, setSmellLoss] = useState(false);
  const [muscleAche, setMuscleAche] = useState(false);
  const [tasteLoss, setTasteLoss] = useState(false);
  const helperTestClasses = helperTextStyles();

  // Handle the popup open/close state
  const handleOpen = () => setOpenModal(true);
  const currentDate = new Date();
  const formattedMonth = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth()}` : currentDate.getMonth();
  const formattedDay = currentDate.getDate() + 1 < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
  const formattedDate = formattedMonth + "/" + formattedDay + "/" + currentDate.getFullYear();

  const handleSymptomsSubmit = async (event) => {
    event.preventDefault();

    if (temperature !== "" && weight !== "") { // if they are filled
      // then only adding new doc
      await addDoc(collection(clientDoc, "Status"), {
        temperature: temperature,
        weight: weight,
        fever: !fever ? "No" : "Yes",
        soreThroat: !soreThroat ? "No" : "Yes",
        cough: !cough ? "No" : "Yes",
        runnyNose: !runnyNose ? "No" : "Yes",
        smellLoss: !smellLoss ? "No" : "Yes",
        muscleAche: !muscleAche ? "No" : "Yes",
        tasteLoss: !tasteLoss ? "No" : "Yes",
        timestamp: serverTimestamp(),
      });

      // Close the popup after user submit the form
      handleClose();
    } else {
      setEmptyFields(true);
    }
  };

  // once modal is closed creating setting back to old values
  const handleClose = () => {
    setOpenModal(false);
    setEmptyFields(false);
    setTemperature("");
    setWeight("");
    setFever(false);
    setSoreThroat(false);
    setCough(false);
    setRunnyNose(false);
    setSmellLoss(false);
    setMuscleAche(false);
    setTasteLoss(false);
  }

  return (
    <div> 
      <Button onClick={handleOpen} className='updateStatus-button'><AddCircleIcon></AddCircleIcon></Button>
      <ThemeProvider theme={theme}>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          onSubmit={handleSymptomsSubmit}
        >
          <Typography className="header-statusModal" variant="h6" component="h2" sx={{ mb: 1.8 }}>
            ADD STATUS
          </Typography>
          <Grid container minWidth={285} spacing={1}>
             {/* Temperature TextField */}
            <Grid item xs={12}>
              <TextField
                id="statusModal-standardBasic"
                placeholder="Temperature (°C)"
                variant="standard"
                color="grey"
                onChange={(e) => setTemperature(e.target.value)}
                helperText={temperature === "" && emptyFields ? "This field is required." : ""}
                error={temperature === "" && emptyFields}
                FormHelperTextProps={{ classes: helperTestClasses }}
              />
            </Grid>
             {/* Weight TextField */}
            <Grid item xs={12}>
              <TextField
                id="statusModal-standardBasic"
                placeholder="Weight (lbs)"
                variant="standard"
                color="grey"
                onChange={(e) => setWeight(e.target.value)}
                helperText={weight === "" && emptyFields ? "This field is required." : ""}
                error={weight === "" && emptyFields}
                FormHelperTextProps={{ classes: helperTestClasses }}
              />
            </Grid>
            
            {/* Checkboxes for symptoms */}
            <Grid item style = {{maxWidth: "160px"}} xs={6} sm={6}><br/>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} onChange={(e) => setFever(e.target.checked)} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Fever</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={6} sm={6}><br/>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} onChange={(e) => setSoreThroat(e.target.checked)} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Sore Throat</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={6}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} onChange={(e) => setCough(e.target.checked)} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Cough</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={6}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} onChange={(e) => setRunnyNose(e.target.checked)} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Runny Nose</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={6}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} onChange={(e) => setSmellLoss(e.target.checked)} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Smell Loss</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={6}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} onChange={(e) => setMuscleAche(e.target.checked)} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Muscle Ache</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={6}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} onChange={(e) => setTasteLoss(e.target.checked)} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Taste Loss</Typography>}/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className="updateStatus__save-btn"
            sx={{ mt: 3, mb: 2}}
          >
            SAVE
          </Button>
        </Box>
      </Modal>
      </ThemeProvider>
    </div>
  );
}