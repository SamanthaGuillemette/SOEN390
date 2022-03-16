/**
 * @fileoverview This component takes care of displaying the profile page.
 *
 */

import Box from "@mui/material/Box";
import ClientProfile from "../../components/ClientProfile";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    background: {
      default: "var(--background-secondary)",
    },
  },
});

const Profile = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <ClientProfile />
        <BottomNav />
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
