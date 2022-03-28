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
 import { doc, setDoc } from "firebase/firestore";
 import MenuItem from "@mui/material/MenuItem";
 import FormControl from "@mui/material/FormControl";
 import { createTheme } from "@material-ui/core/styles";
 import { inputLabelClasses } from "@mui/material/InputLabel";
 import { Navigate } from "react-router-dom";
 import Modal from "@mui/material/Modal";
 import { getAdmin } from "../../backend/firebaseAdminUtilities";
 import { getPatient } from "../../backend/firebasePatientUtilities";
 import { styleForModal, Copyright } from "../SignIn";
 import { makeStyles } from "@material-ui/core/styles";
 import "./SignUp.css";

 const theme = createTheme({
   palette: {
     background: {
       default: "var(--background-secondary)",
     },
     text: {
       primary: "#ffffff",
     },
     error: {
       main: "#ffffff",
     }
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

  // This const does styling of the empty input field helper text
  const helperTextStyles = makeStyles(theme => ({
    root: {
      "&.MuiFormHelperText-root.Mui-error": {
        color: "#d93025",
        fontSize: "12px",
      }
    }
  }));

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
   const [errorMsg, setErrorMsg] = useState("");
   const [emptyFields, setEmptyFields] = useState(false);
   const [checked, setChecked] = useState(false);
   const [user, loading] = useAuthState(auth);
   const helperTestClasses = helperTextStyles();

  /**
    * This function is responsible for setting const attributes if modal is closed
    * @param  {} event
    */
   const handleClose = () => {
     setOpen(false);
     setErrorMsg("");
   };

   /**
    * This function is responsible for setting checked to be true or false depending on whether clicked or not
    * @param  {} event
    */
   const handleChange = (event) => {
     setChecked(event.target.checked);
   };
 
   /**
    * This function is responsible for creating a new document in the admin collection with the information of the user who has signed up.
    * This also ensures that the email is not being reused by the client or admin collection
    * Lastly, the createUserWithEmailAndPassword function will create the database authentication
    * @param  {} event
    */
   const handleSubmit = async (event) => {
    event.preventDefault();
    const adminDoc = await getAdmin(email);
    const clientDoc = await getPatient(email);
    let dobValue, dobWithoutSlash = null;
    const currentDate = new Date(); // getting todays date
    const todaysDate = currentDate.getMonth() +  1 + "" + currentDate.getDate() + "" + currentDate.getFullYear(); // formatting

    if (dob !== null) {
      dobValue = dob.$M + 1 + "/" + dob.$D + "/" + dob.$y; // Required to add + 1 for the month
      dobWithoutSlash = dob.$M + 1 + "" + dob.$D + "" + dob.$y; // Adding without slashes
    }

    if (firstName === "" || lastName === "" || role === "" || dob === null || email === "" || password === "") { // if empty fields
      setEmptyFields(true);
    } else if (adminDoc || clientDoc) { // if email already in use
      setErrorMsg("This email has already been used for the Admin or Client Application. Please use another email.")
      setOpen(true);
    }
    else if (dobValue !== null) { // if its not null
      // if its a future date
      if (Number(dobWithoutSlash) >= Number(todaysDate)) { // comparing dates as integer
        setErrorMsg("You've selected an invalid date. Please try again.");
        setOpen(true);
      }
      else if (!checked) {
        setErrorMsg("Please confirm your data is correct.");
        setOpen(true);
      }
      else { // if valid date && checked
       createUserWithEmailAndPassword(auth, email, password)
         .then(async () => {

          await setDoc(doc(db, "Admin", email.toLowerCase()), {
             firstName: firstName,
             lastName: lastName,
             role: role,
             dob: dobValue,
             email: email.toLowerCase(),
           });
         })
         .catch((error) => {
           setErrorMsg(error.message);
           setOpen(true);
         });
      }
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
                   helperText={firstName === "" && emptyFields ? "This field is required." : ""}
                   error={firstName === "" && emptyFields}
                   FormHelperTextProps={{ classes: helperTestClasses }}
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
                   helperText={lastName === "" && emptyFields ? "This field is required." : ""}
                   error={lastName === "" && emptyFields}
                   FormHelperTextProps={{ classes: helperTestClasses }}
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
                           required
                           helperText={dob === null && emptyFields ? "This field is required." : ""}
                           error={dob === null && emptyFields}
                           FormHelperTextProps={{ classes: helperTestClasses }}
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
                     helperText={role === "" && emptyFields ? "This field is required." : ""}
                     error={role === "" && emptyFields}
                     FormHelperTextProps={{ classes: helperTestClasses }}
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
                     <MenuItem value={"Administrator"}>Administrator</MenuItem>
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
                       checked={checked}
                       onChange={handleChange}
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
                   helperText={email === "" && emptyFields ? "This field is required." : ""}
                   error={email === "" && emptyFields}
                   FormHelperTextProps={{ classes: helperTestClasses }}
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
                   helperText={password === "" && emptyFields ? "This field is required." : ""}
                   error={password === "" && emptyFields}
                   FormHelperTextProps={{ classes: helperTestClasses }}
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
                   {errorMsg}
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