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
  const [contactFullName, setContactFullName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactLocation, setContactLocation] = useState("");
  const helperTestClasses = helperTextStyles();

  // Handle the popup open/close state
  const handleOpen = () => setOpenModal(true);

  const handleDiarySubmit = async (event) => {
    event.preventDefault();

    // if neither are empty
    if (contactFullName !== "") {
      const timestamp = serverTimestamp();

      // adding diary doc by UID
      await addDoc(collection(clientDoc, "Diary"), {
        contactFullName: contactFullName,
        contactPhoneNumber: contactPhoneNumber,
        contactEmail: contactEmail,
        contactLocation: contactLocation,
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
    setContactFullName("");
    setContactPhoneNumber("");
    setContactEmail("");
    setContactLocation("");
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
              {/* Contact Full Name TextField */}
              <Grid item xs={12}>
                <TextField
                  id="diaryAddModal-standardBasic"
                  placeholder="Contact Full Name"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setContactFullName(e.target.value)}
                  helperText={
                    contactFullName === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={contactFullName === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                />
              </Grid>
              {/* Contact Phone Number TextField */}
              <Grid item xs={12}>
                <TextField
                  id="diaryAddModal-standardBasic"
                  placeholder="Contact Phone Number"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setContactPhoneNumber(e.target.value)}
                  helperText={
                    contactPhoneNumber === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={contactPhoneNumber === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                />
              </Grid>
              {/* Contact Email TextField */}
              <Grid item xs={12}>
                <TextField
                  id="diaryAddModal-standardBasic"
                  placeholder="Contact Email"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setContactEmail(e.target.value)}
                  helperText={
                    contactEmail === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={contactEmail === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                />
              </Grid>
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
