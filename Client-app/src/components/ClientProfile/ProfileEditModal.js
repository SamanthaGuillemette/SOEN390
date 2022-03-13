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
// import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../backend/firebase";
import { doc, setDoc } from "firebase/firestore";
import { inputLabelClasses } from "@mui/material/InputLabel";
import FormIcon from "../../assets/form.svg";
import "./ClientProfile.css";
import { useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { updateUserInfo } from "../../store/userInfoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",
  //bgcolor: "#0b0b0b",
  bgcolor: "var(--background-secondary)",
  boxShadow: "0px 0px 2px 2px var(--background-secondary)",
  p: 3,
  overflowY: "scroll",
  borderRadius: "10px",
};

export default function BasicModal() {
  // Pull 'userEmail' out from the centralized store
  const userEmail = useSelector((state) => state.auth.userEmail);

  // Get the client's reference via the userEmail (query the database)
  const clientDoc = doc(db, `Client/${userEmail}`);

  // const dispatch = useDispatch();

  // Pull 'userInfoDetails' out from the centralized store
  const userInfoDetails = useSelector(
    (state) => state.userInfo.userInfoDetails
  );

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

  // Handle the popup open/close state
  const handleOpen = () => setOpenPopup(true);
  const handleClose = () => {
    setOpenPopup(false);
    setButtonColor("var(--primary-main)");
    setIcon(false);
  };

  // Convert DOB to string (Works better this way compared to the SignUp component)
  const handleUpdateDOB = (newDate) => {
    setDOB(`${newDate?.$D}/${newDate?.$M + 1}/${newDate?.$y}`);
  };

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

    await setDoc(clientDoc, {
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
  };

  const HandleUpdate = () => {
    setButtonColor("#27ae60");
    setIcon(true);
  };

  return (
    <div>
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
                onChange={(e) => setProfileImage(e.target.value)}
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="Address"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={handleUpdateDOB}
                    renderInput={(params) => <TextField {...params} />}
                    InputLabelProps={{
                      sx: {
                        color: "var(--text-primary)",
                        [`&.${inputLabelClasses.shrink}`]: {
                          color: "#e0e4e4",
                        },
                      },
                    }}
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
                onChange={(e) => setCity(e.target.value)}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  // labelId="province"
                  id="province"
                  label="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "var(--text-primary)",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#e0e4e4",
                      },
                    },
                  }}
                  select
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
                onChange={(e) => setPostalCode(e.target.value)}
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
          </Grid>
          <Button
            type="submit"
            variant="contained"
            className="update-button"
            style={{ backgroundColor: buttonColor }}
            onClick={HandleUpdate}
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
    </div>
  );
}
