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
import { auth, db } from "../../backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { createTheme } from "@material-ui/core/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import "./../SignUp/SignUp.css";

const styleForModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "var(--background-main)",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link
        className="link-sign"
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

// This function is responsible for the signin component which also communicates with the server and displays relevent error messages if necessary.
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setError1(false);
    setError2(false);
  };

  // This asynchronus function is responsible for the login communication with the server
  // If any errors occur, the modals in the return statement below will show the relevent messages
  // The signInWithEmailAndPassword function from firebase is what allows to authenticate the user.
  const login = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "Client", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        setError2(true);
        setOpen(true);
      });
    } else {
      setError1(true);
      setOpen(true);
    }
  };

  const [user, loading] = useAuthState(auth);

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
            // marginTop: 10,
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
            <FormControlLabel
              control={
                <Checkbox
                  style={{ color: "var(--text-primary)" }}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
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
            {/* This model is used to display an error message for using the same email in the client application as the admin application. 
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
                  {error1 && "This email is registered with the Administration application."}
                  {error2 && "Your password or email is incorrect. Please try again!"}
                </Typography>
              </Box>
            </Modal>
            <Grid container>
              <Grid item xs>
                <Link
                  className="link-sign"
                  href="#"
                  sx={{ color: "var(--primary-main)", textDecoration: "none" }}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  className="link-sign"
                  href="/signup"
                  sx={{ color: "var(--primary-main)", textDecoration: "none" }}
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
