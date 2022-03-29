/**
 * @fileoverview This class contains the component for displaying the add status modal.
 */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { db } from "../../backend/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import { selectUserInfoDetails } from "../../store/userInfoSlice";
import { selectUserEmail } from "../../store/authSlice";

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

export default function SimpleModal() {
  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector(selectUserEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);

  // Pull 'userInfoDetails' out from the centralized store
  const userInfoDetails = useSelector(selectUserInfoDetails);

  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState(true);
  const [dos, setDOS] = useState(userInfoDetails?.dos);
  const [temperature, setTemperature] = useState(userInfoDetails?.temperature);
  const [weight, setWeight] = useState(userInfoDetails?.weight);
  const [fever] = useState(userInfoDetails?.fever);
  const [soreThroat] = useState(userInfoDetails?.soreThroat);
  const [cough] = useState(`${userInfoDetails?.setCough}`);
  const [runnyNose] = useState(userInfoDetails?.runnyNose);
  const [smellLoss] = useState(`${userInfoDetails?.smellLoss}`);
  const [muscleAche] = useState(userInfoDetails?.muscleAche);
  const [tasteLoss] = useState(userInfoDetails?.tastleLoss);

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
      <Button onClick={handleOpen} className="updateStatus-button">
        <AddCircleIcon></AddCircleIcon>
      </Button>
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
            <Typography
              className="header-statusModal"
              variant="h6"
              component="h2"
              sx={{ mb: 1.8 }}
            >
              ADD STATUS
            </Typography>
            <Grid container minWidth={285} spacing={1}>
              {/* Date TextField */}
              <Grid item xs={12}>
                <TextField
                  id="statusModal-standardBasic"
                  placeholder="Date*"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setDOS(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#e0e4e4",
                      },
                    },
                  }}
                />
              </Grid>
              {/* Temperature TextField */}
              <Grid item xs={12}>
                <TextField
                  id="statusModal-standardBasic"
                  placeholder="Temperature*"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setTemperature(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#e0e4e4",
                      },
                    },
                  }}
                />
              </Grid>
              {/* Weight TextField */}
              <Grid item xs={12}>
                <TextField
                  id="statusModal-standardBasic"
                  placeholder="Weight*"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setWeight(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#e0e4e4",
                      },
                    },
                  }}
                />
              </Grid>

              {/* Checkboxes for symptoms */}
              <Grid item style={{ maxWidth: "160px" }} xs={6} sm={6}>
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "lightskyblue" }}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                      Fever
                    </Typography>
                  }
                />
              </Grid>
              <Grid item style={{ maxWidth: "160px" }} xs={6} sm={6}>
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "lightskyblue" }}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                      Sore Throat
                    </Typography>
                  }
                />
              </Grid>
              <Grid item style={{ maxWidth: "160px" }} xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "lightskyblue" }}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                      Cough
                    </Typography>
                  }
                />
              </Grid>
              <Grid item style={{ maxWidth: "160px" }} xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "lightskyblue" }}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                      Runny Nose
                    </Typography>
                  }
                />
              </Grid>
              <Grid item style={{ maxWidth: "160px" }} xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "lightskyblue" }}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                      Smell Loss
                    </Typography>
                  }
                />
              </Grid>
              <Grid item style={{ maxWidth: "160px" }} xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "lightskyblue" }}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                      Muscle Ache
                    </Typography>
                  }
                />
              </Grid>
              <Grid item style={{ maxWidth: "160px" }} xs={6} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "lightskyblue" }}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" style={{ color: "white" }}>
                      Taste Loss
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              className="save-button"
              sx={{ mt: 3, mb: 2 }}
            >
              SAVE
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
