import Box from "@mui/material/Box";
import ClientProfile from "../../components/ClientProfile";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import {createMuiTheme } from "@material-ui/core/styles";
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createMuiTheme({
    palette: {
      background: {
        default: "var(--background-secondary)"
      },
    },
  });

const Profile = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Box sx={{ flexGrow: 1 }}>
                    <MenuAppBar></MenuAppBar>
                    <ClientProfile></ClientProfile>
                    <BottomNav></BottomNav>
                </Box>
       </ThemeProvider>
    );
};

export default Profile;