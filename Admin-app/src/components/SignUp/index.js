/**
 * @fileoverview This component takes care of the sign up function.
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
import { auth, db } from "../../backend/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { createTheme } from "@material-ui/core/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
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

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link
        className="SIGN-UP__link"
        sx={{ fontSize: "12px", textDecoration: "none" }}
        color="inherit"
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
 * Next, it will make a document in the collection of admin on the server with all the necessary information
 * @param  {} props
 */
export default function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
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
   * @param  {} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const docRef = doc(db, "Client", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setError1(true);
      setOpen(true);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const dobValue = dob.$M + "/" + dob.$D + "/" + dob.$y;
          await setDoc(doc(db, "Admin", email), {
            firstName: firstName,
            lastName: lastName,
            role: role,
            dob: dobValue,
            email: email,
          });
        })
        .catch((error) => {
          setErrorMsg(error.message);
          setError2(true);
          setOpen(true);
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
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
                <FormControl fullWidth>
                  <TextField
                    required
                    labelId="Role"
                    id="Role"
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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
                    <MenuItem value={"Doctor"}>Doctor</MenuItem>
                    <MenuItem value={"Health Official"}>
                      Health Official
                    </MenuItem>
                    <MenuItem value={"Immigration Officer"}>
                      Immigration Officer
                    </MenuItem>
                    <MenuItem value={"Adminstrator"}>Adminstrator</MenuItem>
                  </TextField>
                </FormControl>
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
            {/* This model is used to display an error message for using the same email in the admin application as the client application 
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
                    "This email has already been used for the Client Application. Please use another email."}
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
