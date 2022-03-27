/**
 * @fileoverview This component takes care of the sign in  function.
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { createTheme } from "@material-ui/core/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import "./../SignUp/SignUp.css";

const styleForModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--background-main)",
  borderRadius: '10px',
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
        className="SIGN-IN__link"
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
});

/**
 * This function is responsible for the signin component which also communicates with the server and displays relevent error messages if necessary.
 */
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  // const [open2, setOpen2] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };
  const [user, loading] = useAuthState(auth);
   /**
    * This asynchronus function is responsible for the login communication with the server
    * If any errors occur, the modals in the return statement below will show the relevent messages
    * The signInWithEmailAndPassword function from firebase is what allows to authenticate the user.
    * @param  {} e
    */
    const login = async (e) => {
      e.preventDefault();
      const adminDocSnap = await getDoc(doc(db, "Admin", email));
      const clientDocSnap = await getDoc(doc(db, "Client", email));

      if (adminDocSnap.data().disabled === "true") {
        setErrorMessage("Your account has been disabled.");
        setOpen(true);
      }
      else if (adminDocSnap.exists()) {
        signInWithEmailAndPassword(auth, email, password).catch((error) => { // incorrect password
          setErrorMessage("Incorrect password, please try again");
          setOpen(true);
        });
      }
      else if (!adminDocSnap.exists() && clientDocSnap.exists()) { // exists only on client app
        setErrorMessage("This account is registered on the Client application.");
        setOpen(true);
      }
      else if (!adminDocSnap.exists() && !clientDocSnap.exists()) { // account doesn't exist
        setErrorMessage("Couldn't find your account.");
        setOpen(true);
      }
    };
  if (user) {
    return <Navigate to="/" replace={true} />;
  }
  if (loading) {
    return <p>loading</p>;
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
              Sign In
            </Button>
            {/* This model is used to display an error message for using the same email in the admin application as the client application. 
            Also pertaining to the database such as wrong email or wrong password  */}
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
                  {errorMessage}
                </Typography>
              </Box>
            </Modal>
            <Grid container>
              <Grid item xs>
                <Link
                  className="SIGN-IN__link"
                  sx={{ color: "var(--primary-main)", textDecoration: "none" }}
                  href="#"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className="SIGN-IN__link"
                  sx={{ color: "var(--primary-main)", textDecoration: "none" }}
                  href="/signup"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
