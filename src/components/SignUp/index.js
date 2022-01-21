import * as React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './signup.css';

const SignUp = () => {
  return (
    <div >
      <div className="Signup">
        <h3>SignUp to Continue</h3>
        <form className="SignupForm">
          <TextField
            required
            id="outlined-required"
            label="First Name"
            type="text" />
          <TextField
            required
            id="outlined-password-input"
            label="Last Name"
            type="text" />
          <br /><br />
          <TextField
            required
            id="outlined-required"
            label="Address"
            type="text" />
          <TextField
            required
            id="outlined-required"
            label="Postal Code"
            type="text" />
             <br /><br />
          <TextField
            required
            id="outlined-required"
            label="City"
            type="text" />
          <TextField
            required
            id="outlined-required"
            label="Phone Number"
            type="number" />
            <br /><br />
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email" />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password" />
          <br /><br />
          <Button variant="contained">SignUp</Button>
          <br />
          <p>Already have an account? <a href="#"> SignUp here!</a> </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

