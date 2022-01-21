import * as React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './signin.css';
const SignIn = () => {
  return (
    <div >
      <div className="Login">
        <h3>SignIn to Continue</h3>
        <form className="LoginForm">
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email" />
          <br /><br />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password" />
          <br /><br />
          <Button variant="contained">Login</Button>
          <br />
          <p>Forgot your password? <a href="#"> click here!</a> </p>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
