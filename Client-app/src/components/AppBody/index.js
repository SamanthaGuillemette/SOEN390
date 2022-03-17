/**
 * @fileoverview This component displays the app body.
 *
 */
import Box from "@mui/material/Box";
import BottomNav from "../BottomNav";
import MenuAppBar from "../Navbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

/**
 * This component returns the app body containing the Sidebar, Navbar and Bottom Navbar components.
 * @returns {JSX.Element}
 */

 function AppBody(props) {
     return (
        <Box sx={{ display: "flex" }}>
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
            }}
            >
            <MenuAppBar/>
            <BottomNav/>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid spacing={3} padding={2}>
                {props.children}
                </Grid>
            </Container>
            </Box>
        </Box>
     );
 }
 export default AppBody;