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
import {auth, db} from '../../backend/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate } from "react-router-dom";
import Modal from '@mui/material/Modal';

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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp(props) {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [dob, setDOB] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [
    user,
    loading,
    error,
  ] = useAuthState(auth);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    const docRef = doc(db, "Client", email);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      setOpen(true)
    }else{
      const dobValue = dob.$D + "/" + (dob.$M + 1) + "/" + dob.$y;
      await setDoc(doc(db, "Admin", email), { 
        firstName: firstName,
        lastName: lastName,
        role: role,
        dob: dobValue,
        email: email
      });
      createUserWithEmailAndPassword(auth, email, password); 
    }
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      required
                      labelId="Role"
                      id="Role"
                      label="Role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                     <MenuItem value={"Doctor"}>Doctor</MenuItem>
                     <MenuItem value={"Health Official"}>Health Official</MenuItem>
                     <MenuItem value={"Immigration Officer"}>Immigration Officer</MenuItem>
                     <MenuItem value={"Adminstrator"}>Adminstrator</MenuItem>
                  </Select>
                </FormControl>
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
                This email has already been used for the Client Application. Please use another email. 
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
