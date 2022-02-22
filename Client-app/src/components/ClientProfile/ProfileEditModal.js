import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../backend/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
  borderRadius: 1,
};

export default function BasicModal() {
  const [user] = useAuthState(auth);
  const clientDoc = doc(db, `Client/${user?.email}`);

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dob, setDOB] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const dobValue = dob.$D + "/" + (dob.$M + 1) + "/" + dob.$y;
    await setDoc(clientDoc, {
      firstName: firstName,
      lastName: lastName,
      photoUrl: photoUrl,
      address: address,
      postalCode: postalCode,
      city: city,
      province: province,
      dob: dobValue,
    });
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
        open={open}
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
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Update your profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="photoUrl"
                fullWidth
                id="photoUrl"
                label="Profile Photo"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
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
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(e) => {
                      setDOB(e);
                    }}
                    renderInput={(params) => <TextField {...params} />}
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Province</InputLabel>
                <Select
                  labelId="province"
                  id="province"
                  label="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
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
                </Select>
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
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            UPDATE
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
