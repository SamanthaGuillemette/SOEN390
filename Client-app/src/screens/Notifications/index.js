import Box from "@mui/material/Box";
import Notifications from "../../components/Notifications";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";
import {createTheme } from "@material-ui/core/styles";
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
      background: {
        default: "var(--background-secondary)"
      },
    },
  });

const NotificationsPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Box sx={{ flexGrow: 1 }}>
                    <MenuAppBar></MenuAppBar>
                    <Notifications></Notifications>
                    <BottomNav></BottomNav>
                </Box>
       </ThemeProvider>
    );
};

export default NotificationsPage;