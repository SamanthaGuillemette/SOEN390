import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import {useLocation} from 'react-router-dom';
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

function AppBody(props) {
  const location = useLocation().pathname;

  if(location === '/signup'){
    return (
      <SignUp />
    )
  }else if (location === '/signin'){ 
    return (
      <SignIn />
    )
  }else{
    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Navbar />
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} padding={2}>
              {props.children}
            </Grid>
          </Container>
        </Box>
      </Box>
    );
  }

  
}

export default AppBody;
