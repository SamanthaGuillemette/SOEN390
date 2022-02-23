import * as React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import { db, auth } from "../../backend/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import { createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SignUp(props) {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dob, setDOB] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const handleClose = () => {
    setOpen(false) 
    setOpen2(false)
  };
  
  const [
    user,
    loading,
  ] = useAuthState(auth);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const docRef = doc(db, "Admin", email);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setOpen(true);
    }else{
      const dobValue = dob.$D + "/" + (dob.$M + 1) + "/" + dob.$y;
      await setDoc(doc(db, "Client", email), { 
      firstName: firstName,
      lastName: lastName,
      address: address,
      postalCode: postalCode,
      city: city,
      province: province,
      dob: dobValue,
      email: email
    });
    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        setErrorMsg(error.message);
        setOpen2(true);
      })
    }
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                />
              </Grid>
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(e) => {setDOB(e)}}
                    renderInput={(params) => <TextField {...params} />}
                  />
               </Stack>
             </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
              <FormControlLabel
                  required
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Error
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This email has already been used for the Admin Application. Please use another email. 
              </Typography>
            </Box>
            </Modal>
            <Modal
              open={open2}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Error
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {errorMsg}
              </Typography>
            </Box>
          </Modal>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body2">
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
