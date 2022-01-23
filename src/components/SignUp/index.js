import * as React from 'react';
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
import {firebaseAuth} from  '../../backend/AuthProvider'
import Stack from '@mui/material/Stack';

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

export default function SignUp(props) {
  
  //const {handleSignup, inputs, setInputs, errors} = React.useContext(firebaseAuth);
  const [value, setValue] = React.useState(null);
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    // await handleSignup()
    props.history.push('/')
  }

  const handleChange = e => {
    const {name, value} = e.target
    // setInputs(prev => ({ ...prev, [name]: value}))
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
                  // value={inputs.fistName}
                  autoFocus
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
                  // value={inputs.lastName}
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  required
                  fullWidth
                  id="province"
                  label="Province"
                  name="Province"
                  autoComplete="address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  required
                  fullWidth
                  id="postalCode"
                  label ="Postal Code"
                  name="Postal Code"
                  autoComplete="postal-code"
                />
              </Grid>
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Date of Birth"
                    readOnly
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                  }}
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
                  // value={inputs.email}
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
                  // value={inputs.password}
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
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
