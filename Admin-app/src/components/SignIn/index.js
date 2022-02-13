import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../backend/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { Navigate } from "react-router-dom";
import {createMuiTheme } from "@material-ui/core/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import "./SignIn.css";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © '}
      <Link className="link-sign" sx={{fontSize: "12px", textDecoration: 'none'}} color="inherit">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#1e1e1e"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

export default function SignIn() {
  console.log(inputLabelClasses);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async(e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
  }
  
  const [user,
    loading,
    error] = useAuthState(auth);

    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      );
    }
    if (user) {
      return (
        <Navigate to="/" replace={true}/>
      );
    }
    if (loading) {
      return (
        <p>loading</p>
        );
    }
  
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{bgcolor: "#171717", borderRadius: "20px"}} component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: '#949be2' }}>
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
                    color: "white",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#8bc3eb"
                    }
                  }
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
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  sx: {
                    color: "white",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#8bc3eb"
                    }
                  }
                }}
              />
              <FormControlLabel
                control={<Checkbox style={{color: "white"}} value="remember" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  background: 'linear-gradient(to right, #8bc3eb, #949be2)'
                }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link className="link-sign" sx={{color: "#8bc3eb", textDecoration: 'none'}} href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="link-sign" sx={{color: "#8bc3eb", textDecoration: 'none'}} href="/signup" variant="body2">
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