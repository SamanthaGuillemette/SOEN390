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
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../backend/firebase';
import {db} from '../../backend/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {createMuiTheme } from "@material-ui/core/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import { Navigate } from "react-router-dom";
import "./../SignIn";
import "./SignUp.css";

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
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: "#767676"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "yellow"
        }
      }
    },
  },
});

export default function SignUp(props) {
  console.log(inputLabelClasses);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dob, setDOB] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [
    user,
    loading,
    error,
  ] = useAuthState(auth);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const dobValue = dob.$D + "/" + (dob.$M + 1) + "/" + dob.$y;
    await setDoc(doc(db, "Users", email), { 
      firstName: firstName,
      lastName: lastName,
      address: address,
      postalCode: postalCode,
      city: city,
      province: province,
      dob: dobValue,
      email: email
    });
    createUserWithEmailAndPassword(auth, email, password);
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        {console.log('Registered the user: ' + user.email)}
        {<Navigate to="/" replace={true}/>}
      </div>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                      color: "white",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#8bc3eb"
                      }
                    }
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
                      color: "white",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#8bc3eb"
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  required
                  fullWidth
                  id="address"
                  label ="Address"
                  name="Address"
                  autoComplete="street-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#8bc3eb"
                      }
                    }
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
                      color: "white",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#8bc3eb"
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Province</InputLabel>
                    <Select
                      required
                      labelId="province"
                      id="province"
                      label="province"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    >
                    <MenuItem value={"Alberta"}>Alberta</MenuItem>
                    <MenuItem value={"British Columbia"}>British Columbia</MenuItem>
                    <MenuItem value={"Manitoba"}>Manitoba</MenuItem>
                    <MenuItem value={"New Brunswic"}>New Brunswick</MenuItem>
                    <MenuItem value={"Newfoundland and Labrador"}>Newfoundland and Labrador</MenuItem>
                    <MenuItem value={"Nova Scotia"}>Nova Scotia</MenuItem>
                    <MenuItem value={"Ontario"}>Ontario</MenuItem>
                    <MenuItem value={"Prince Edward Island"}>Prince Edward Island</MenuItem>
                    <MenuItem value={"Quebec"}>Quebec</MenuItem>
                    <MenuItem value={"Saskatchewan"}>Saskatchewan</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  required
                  fullWidth
                  id="postalCode"
                  label ="Postal Code"
                  name="Postal Code"
                  autoComplete="postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#8bc3eb"
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(e) => {setDOB(e)}}
                    renderInput={(params) => <TextField {...params} 
                    InputLabelProps={{
                      sx: {
                        color: "white",
                        [`&.${inputLabelClasses.shrink}`]: {
                          color: "#8bc3eb"
                        }
                      }
                    }}
                    />}
                  />
               </Stack>
             </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
              <FormControlLabel
                  required
                  control={<Checkbox className="signup-checkbox" value="allowExtraEmails" />}
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
                      color: "white",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#8bc3eb"
                      }
                    }
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
                      color: "white",
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: "#8bc3eb"
                      }
                    }
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
                background: 'linear-gradient(to right, #8bc3eb, #949be2)'
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link className="link-sign" sx={{textDecoration: 'none', color: "#8bc3eb"}} href="/signin" variant="body2">
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
