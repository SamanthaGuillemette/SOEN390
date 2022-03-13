import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from "react-redux";
import { db } from "../../backend/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";

const style = {
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--background-secondary)",
  width: "48vh",
  height: "83vh",
  p: 3,
  borderRadius: "10px",
};

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
    },
  },
});

export default function SimpleModal() {
  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector((state) => state.auth.userEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);

  // Pull 'userInfoDetails' out from the centralized store
  const userInfoDetails = useSelector(
  (state) => state.userInfo.userInfoDetails
  );

  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(true);
  const [dos, setDOS] = useState(userInfoDetails?.dos);
  const [temperature, setTemperature] = useState(userInfoDetails?.temperature);
  const [weight, setWeight] = useState(userInfoDetails?.weight);
  const [fever, setFever] = useState(userInfoDetails?.fever);
  const [soreThroat, setSoreThroat] = useState(userInfoDetails?.soreThroat);
  const [cough, setCough] = useState(`${userInfoDetails?.setCough}`);
  const [runnyNose, setRunnyNose] = useState(userInfoDetails?.runnyNose);
  const [smellLoss, setSmellLoss] = useState(`${userInfoDetails?.smellLoss}`);
  const [muscleAche, setMuscleAche] = useState(userInfoDetails?.muscleAche);
  const [tasteLoss, setTasteLoss] = useState(userInfoDetails?.tastleLoss);

  // Handle the popup open/close state
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

 const handleSymptomsSubmit = async (event) => {
    event.preventDefault();

    await updateDoc(clientDoc, {
      dos: dos,
      temperature: temperature,
      weight: weight,
      fever: fever,
      soreThroat: soreThroat,
      cough: cough,
      runnyNose: runnyNose,
      smellLoss: smellLoss,
      muscleAche: muscleAche,
      tasteLoss: tasteLoss,
    });

    // Close the popup after user submit the form
    handleClose();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
          <Typography className="header-statusModal" variant="h6" component="h2" sx={{ mb: 2 }}>
            ADD STATUS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Date*"
                variant="standard"
                onChange={(e) => setDOS(e.target.value)}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#e0e4e4",
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Temperature*"
                variant="standard"
                onChange={(e) => setTemperature(e.target.value)}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#e0e4e4",
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Weight*"
                variant="standard"
                onChange={(e) => setWeight(e.target.value)}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#e0e4e4",
                    }
                  }
                }}
              />
            </Grid>

            <Grid item style = {{maxWidth: "160px"}} xs={4} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} checked={checked} onChange={handleChange} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Fever</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={4} sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} checked={checked} onChange={handleChange} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Sore Throat</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={4}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} checked={checked} onChange={handleChange} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Cough</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={4}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} checked={checked} onChange={handleChange} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Runny Nose</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={4}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} checked={checked} onChange={handleChange} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Smell Loss</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={4}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} checked={checked} onChange={handleChange} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Muscle Ache</Typography>}/>
            </Grid>
            <Grid item style = {{maxWidth: "160px"}} xs={4}  sm={6}>
              <FormControlLabel control={<Checkbox style ={{color: "lightskyblue"}} checked={checked} onChange={handleChange} /> } label={<Typography variant="subtitle2" style={{ color: "white" }}>Taste Loss</Typography>}/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className="save-button"
            sx={{ mt: 4, mb: 2}}
          >
            SAVE
          </Button>
        </Box>
      </Modal>
      </ThemeProvider>
    </div>
  );
}