/**
 * @fileoverview This component displays the app body.
 *
 */
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

/**
 * This component returns the app body containing the Toolbar, Sidebar and Navbar components.
 * @returns {JSX.Element}
 */

function AppBody(props) {

    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            backgroundColor: "var(--background-secondary)",
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

export default AppBody;
