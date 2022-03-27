/**
 * @fileoverview This component displays & handles the login/signup form.
 *
 */
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../backend/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { createTheme } from "@material-ui/core/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import "./SignUp.css";

const styleForModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--background-main)",
  borderRadius: "10px",
  border: "1px solid var(--info-border)",
  boxShadow: 24,
  color: "var(--info-main)",
  p: 4,
};

/**
 * Return copyright info
 * @param  {} props
 */
function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link
        color="inherit"
        className="SIGN-UP__link"
        sx={{ fontSize: "12px", textDecoration: "none" }}
      >
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    background: {
      default: "var(--background-secondary)",
    },
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
      },
    },
  },
});

/**
 * This function is responsible for the signup component which also communicates with the server and displays relevent error messages if necessary.
 * Next, it will make a document in the collection of client on the server with all the necessary information
 *
 * @param  {} props
 */
export default function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [dob, setDOB] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleClose = () => {
    setOpen(false);
    setError1(false);
    setError2(false);
  };

  const [user, loading] = useAuthState(auth);

  /**
   * This function is responsible for creating a new document in the admin collection with the information of the user who has signed up.
   * This also ensures that the email is not being reused by the client or admin collection
   * Lastly, the createUserWithEmailAndPassword function will create the database authentication
   *
   * @param  {clickEvent} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const docRef = doc(db, "Admin", email);
    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {
      setError1(true);
      setOpen(true);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          // Needs to be in the "Short Date" format if we're using slashes
          // Required to be in either ISO, Short or Long format in order to convert to a Date object
          // Also required to add + 1 for the month
          const dobValue = dob.$M + 1 + "/" + dob.$D + "/" + dob.$y;

          await setDoc(doc(db, "Client", email.toLowerCase()), {
            firstName: firstName,
            lastName: lastName,
            address: address,
            postalCode: postalCode,
            city: city,
            province: province,
            dob: dobValue,
            email: email.toLowerCase(),
          });
        })
        .catch((error) => {
          setErrorMsg(error.message);
          setError2(true);
          setOpen(true);
        });
    }
  };
  /**
   * Check if the page is still loading
   * @param  {boolean} loading
   */
  if (loading) {
    return <p>Loading...</p>;
  }

  /**
   * Navigte user to the dashboard if the user is already logged in
   * @param  {Object} user
   */
  if (user) {
    return (
      <div>
        {console.log("Registered the user: " + user.email)}
        {<Navigate to="/" replace={true} />}
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ bgcolor: "var(--background-main)", borderRadius: "20px" }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "var(--secondary-main)" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
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
                        color: "var(--primary-main)",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
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
                        color: "var(--primary-main)",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
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
                        color: "var(--primary-main)",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    id="province"
                    label="Province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    InputLabelProps={{
                      sx: {
                        color: "var(--text-primary)",
                        [`&.${inputLabelClasses.shrink}`]: {
                          color: "var(--primary-main)",
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
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="Postal Code"
                  autoComplete="postal-code"
                  // InputProps={{ pattern: "[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]\d[ABCEGHJ-NPRSTV-Z]\d$/i" }}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
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
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DatePicker
                      label="Date of Birth"
                      value={dob}
                      onChange={(e) => {
                        setDOB(e);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            sx: {
                              color: "var(--text-primary)",
                              [`&.${inputLabelClasses.shrink}`]: {
                                color: "var(--primary-main)",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      className="SIGN-UP__checkbox"
                      value="allowExtraEmails"
                    />
                  }
                  label="I confirm my data above is correct."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "var(--gradient-to-right)",
              }}
            >
              Sign Up
            </Button>
            {/* This model is used to display an error message for using the same email in the client application as the admin application 
            and pertaining to the database such as wrong email or wrong password */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleForModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Error
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {error1 &&
                    "This email has already been used for the Admin Application. Please use another email."}
                  {error2 && errorMsg}
                </Typography>
              </Box>
            </Modal>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  className="SIGN-UP__link"
                  sx={{ textDecoration: "none", color: "var(--primary-main)" }}
                  href="/signin"
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
