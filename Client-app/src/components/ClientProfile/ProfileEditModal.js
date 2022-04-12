/**
 * @fileoverview This component displays the popup modal for editing client profile.
 *
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import { FormControl, Grid, MenuItem, Stack, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDayjs";
import { db } from "../../backend/firebase";
import { doc, updateDoc } from "firebase/firestore";
import FormIcon from "../../assets/form.svg";
import "./ClientProfile.css";
import { useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { selectUserEmail } from "../../store/authSlice";
import { selectUserInfoDetails } from "../../store/userInfoSlice";

const useStyles = makeStyles({
  root: {
    // input label when focused
    "& label.Mui-focused": {
      color: "var(--primary-main)",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",
  bgcolor: "var(--background-secondary)",
  boxShadow: "0px 0px 2px 2px var(--background-secondary)",
  p: 3,
  overflowY: "scroll",
  borderRadius: "10px",
};

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: "var(--text-inactive)",
        },
        root: {
          "&.Mui-focused": {
            color: "yellow",
          },
        },
      },
    },
  },
});

export default function BasicModal() {
  const classes = useStyles();

  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector(selectUserEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);

  // const dispatch = useDispatch();

  // Pull 'userInfoDetails' out from the centralized store
  const userInfoDetails = useSelector(selectUserInfoDetails);

  const [openPopup, setOpenPopup] = useState(false);
  const [firstName, setFirstName] = useState(userInfoDetails?.firstName);
  const [lastName, setLastName] = useState(userInfoDetails?.lastName);
  const [address, setAddress] = useState(userInfoDetails?.address);
  const [city, setCity] = useState(userInfoDetails?.city);
  const [province, setProvince] = useState(`${userInfoDetails?.province}`);
  const [postalCode, setPostalCode] = useState(userInfoDetails?.postalCode);
  const [dob, setDOB] = useState(`${userInfoDetails?.dob}`);
  const [profileImage, setProfileImage] = useState(
    userInfoDetails?.profileImage || ""
  );
  const [buttonColor, setButtonColor] = useState("var(--primary-main)");
  const [icon, setIcon] = useState(false);

  /**
   * Handle the popup open state
   * @returns {void}
   */
  const handleOpen = () => setOpenPopup(true);

  /**
   * Handle the popup close state
   * @returns {void}
   */
  const handleClose = () => {
    setOpenPopup(false);
    setButtonColor("var(--primary-main)");
    setIcon(false);
  };

  /**
   * Convert DOB to string (Works better this way compared to the SignUp component)
   * @param {Object} date
   */
  const handleUpdateDOB = (newDate) => {
    setDOB(`${newDate?.$M + 1}/${newDate?.$D}/${newDate?.$y}`);
  };

  /**
   * Update the client's data to the database
   * @param {ClickEvent} event
   */
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    // dispatch(
    //   updateUserInfo(userEmail, {
    //     firstName: firstName,
    //     lastName: lastName,
    //     profileImage: profileImage,
    //     address: address,
    //     postalCode: postalCode,
    //     city: city,
    //     province: province,
    //     dob: dob,
    //   })
    // );

    await updateDoc(clientDoc, {
      firstName: firstName,
      lastName: lastName,
      profileImage: profileImage,
      address: address,
      postalCode: postalCode,
      city: city,
      province: province,
      dob: dob,
    });

    // Close the popup after user submit the form
    handleClose();

    // Refresh page after user submit the form
    window.location.reload();
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
    <ThemeProvider theme={theme}>
      <Fab
        onClick={handleOpen}
        color="primary"
        aria-label="edit"
        className="clientProfile-editIcon"
      >
        <EditIcon fontSize="small" />
      </Fab>
      <Modal
        open={openPopup}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          onSubmit={handleUpdateSubmit}
        >
          <img className="update_profile__img" src={FormIcon} alt="My Doctor" />
          <Typography
            className="header-update-profile"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Update your profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="profileImage"
                fullWidth
                id="profileImage"
                label="Profile Photo"
                value={profileImage}
                className={classes.root}
                onChange={(e) => setProfileImage(e.target.value)}
                sx={{
                  input: {
                    background: "#262626",
                    borderRadius: "5px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                className={classes.root}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{
                  input: {
                    background: "#262626",
                    borderRadius: "5px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                className={classes.root}
                onChange={(e) => setLastName(e.target.value)}
                sx={{
                  input: {
                    background: "#262626",
                    borderRadius: "5px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="Address"
                autoComplete="street-address"
                value={address}
                className={classes.root}
                onChange={(e) => setAddress(e.target.value)}
                sx={{
                  input: {
                    background: "#262626",
                    borderRadius: "5px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={handleUpdateDOB}
                    renderInput={(params) => (
                      <TextField
                        className={classes.root}
                        sx={{
                          input: {
                            background: "#262626",
                            borderRadius: "5px",
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: "var(--text-primary)",
                          },
                        }}
                        {...params}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="city"
                label="City"
                name="City"
                autoComplete="address-level3"
                value={city}
                className={classes.root}
                onChange={(e) => setCity(e.target.value)}
                sx={{
                  input: {
                    background: "#262626",
                    borderRadius: "5px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  // labelId="province"
                  id="province"
                  label="Province"
                  value={province}
                  className={classes.root}
                  onChange={(e) => setProvince(e.target.value)}
                  select
                  SelectProps={{
                    sx: {
                      background: "#262626",
                      color: "var(--text-primary)",
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                    },
                  }}
                >
                  <MenuItem value={"Alberta"}>Alberta</MenuItem>
                  <MenuItem value={"British Columbia"}>
                    British Columbia
                  </MenuItem>
                  <MenuItem value={"Manitoba"}>Manitoba</MenuItem>
                  <MenuItem value={"New Brunswic"}>New Brunswick</MenuItem>
                  <MenuItem value={"Newfoundland and Labrador"}>
                    Newfoundland and Labrador
                  </MenuItem>
                  <MenuItem value={"Nova Scotia"}>Nova Scotia</MenuItem>
                  <MenuItem value={"Ontario"}>Ontario</MenuItem>
                  <MenuItem value={"Prince Edward Island"}>
                    Prince Edward Island
                  </MenuItem>
                  <MenuItem value={"Quebec"}>Quebec</MenuItem>
                  <MenuItem value={"Saskatchewan"}>Saskatchewan</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="postalCode"
                label="Postal Code"
                name="Postal Code"
                autoComplete="postal-code"
                value={postalCode}
                className={classes.root}
                onChange={(e) => setPostalCode(e.target.value)}
                sx={{
                  input: {
                    background: "#262626",
                    borderRadius: "5px",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "var(--text-primary)",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className="update-button"
            style={{ backgroundColor: buttonColor }}
            onClick={displaySuccessCheckmark}
            sx={{ mt: 3, mb: 2 }}
          >
            {icon ? (
              <CheckCircleOutlineIcon
                sx={{ fontSize: "175%" }}
              ></CheckCircleOutlineIcon>
            ) : (
              "UPDATE"
            )}
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="cancel-button"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClose}
          >
            CANCEL
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
