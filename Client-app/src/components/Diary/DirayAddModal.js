/**
 * @fileoverview This class contains the component for displaying the add status modal.
 */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { db } from "../../backend/firebase";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
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

// This const does styling of the empty input field helper text
const helperTextStyles = makeStyles((theme) => ({
  root: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: "#d93025",
      fontSize: "12px",
    },
  },
}));

export default function DiaryAddModal() {
  const userInfoDetails = useSelector(
    (state) => state.userInfo.userInfoDetails
  );

  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector(selectUserEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);

  // Get the doctor's reference via the assigned doctor (query the database)
  // const adminDoc = doc(db, `Admin/${userInfoDetails?.assignedDoctor}`);

  const [openModal, setOpenModal] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [contactLocation, setContactLocation] = useState("");
  const [contactPostalCode, setContactPostalCode] = useState("");
  const helperTestClasses = helperTextStyles();

  const handleOpen = () => setOpenModal(true);

  const handleDiarySubmit = async (event) => {
    event.preventDefault();

    // if neither are empty
    if (contactLocation !== "" && contactPostalCode !== "") {
      const timestamp = serverTimestamp();

      // adding diary doc by UID
      await addDoc(collection(clientDoc, "Diary"), {
        contactLocation: contactLocation,
        contactPostalCode: contactPostalCode,
        timestamp: timestamp,
      });

      // Close the popup after user submit the form
      handleClose();
    } else {
      setEmptyFields(true);
    }
  };

  function close() {
    setTimeout(() => handleClose(), 3000);
  }

  // once modal is closed creating setting back to old values
  const handleClose = () => {
    setOpenModal(false);
    setEmptyFields(false);
    setContactLocation("");
    setContactPostalCode("");
  };

  return (
    <div>
      <Button onClick={handleOpen} className="addDiary-button">
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
            onSubmit={handleDiarySubmit}
          >
            <Typography
              className="header-diaryAddModal"
              variant="h6"
              component="h2"
              sx={{ mb: 2.5 }}
            >
              ADD DIARY
            </Typography>
            <Grid container minWidth={285} spacing={1}>
              {/* Contact Location TextField */}
              <Grid item xs={12}>
                <TextField
                  id="diaryAddModal-standardBasic"
                  placeholder="Contact Location"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setContactLocation(e.target.value)}
                  helperText={
                    contactLocation === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={contactLocation === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="diaryAddModal-standardBasic"
                  placeholder="Contact Postal Code"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setContactPostalCode(e.target.value)}
                  helperText={
                    contactPostalCode === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={contactPostalCode === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                />
              </Grid>
            </Grid>
            <Button
              onClick={close}
              type="submit"
              variant="contained"
              className="addDiary__save-btn"
              sx={{ mt: 4, mb: 2 }}
            >
              SAVE
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
