/**
 * @fileoverview This class contains the component for displaying the add status modal.
 */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { db } from "../../backend/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { TextMaskCustom } from "../SignUp/index";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { selectUserEmail } from "../../store/authSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

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
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const helperTestClasses = helperTextStyles();

  const handleOpen = () => setOpenModal(true);
  const [buttonColor, setButtonColor] = useState("var(--primary-main)");
  const [icon, setIcon] = useState(false);

  const handleDiarySubmit = async (event) => {
    event.preventDefault();

    // if neither are empty
    if (description !== "" && location !== "" && postalCode !== "") {
      const timestamp = serverTimestamp();

      // adding diary doc by UID
      await addDoc(collection(clientDoc, "Diary"), {
        description: description,
        location: location,
        postalCode: postalCode.toUpperCase(),
        timestamp: timestamp,
      });

      // Close the popup after user submit the form
      handleClose();
    } else {
      setEmptyFields(true);
    }
  };

  /**
   * Handle the modal close state setting back to old values
   * @returns {void}
   */
  const handleClose = () => {
    setOpenModal(false);
    setEmptyFields(false);
    setDescription("");
    setLocation("");
    setPostalCode("");
    setButtonColor("var(--primary-main)");
    setIcon(false);
  };

  /**
   * Display the update button color & icon after submit
   * @returns {void}
   */
  const displaySuccessCheckmark = () => {
    setButtonColor("#27ae60");
    setIcon(true);
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
              {/* Contact Desciption TextField */}
              <Grid item xs={12}>
                <TextField
                  id="diaryAddModal-standardBasic"
                  placeholder="Description"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setDescription(e.target.value)}
                  helperText={
                    description === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={description === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="diaryAddModal-standardBasic"
                  placeholder="Location"
                  variant="standard"
                  color="grey"
                  onChange={(e) => setLocation(e.target.value)}
                  helperText={
                    location === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={location === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="diaryAddModal-standardBasic"
                  placeholder="Postal Code"
                  value={postalCode}
                  variant="standard"
                  color="grey"
                  onChange={(e) => setPostalCode(e.target.value)}
                  helperText={
                    postalCode === "" && emptyFields
                      ? "This field is required."
                      : ""
                  }
                  error={postalCode === "" && emptyFields}
                  FormHelperTextProps={{ classes: helperTestClasses }}
                  InputProps={{
                    inputComponent: TextMaskCustom,
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "var(--primary-main)",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: buttonColor }}
              className="addDiary__save-btn"
              sx={{ mt: 4, mb: 2 }}
              onClick={displaySuccessCheckmark}
            >
              {icon && !emptyFields ? (
                <CheckCircleOutlineIcon
                  sx={{ fontSize: "175%" }}
                ></CheckCircleOutlineIcon>
              ) : (
                "SAVE"
              )}
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
