/**
 * @fileoverview This component displays chat screen.
 *
 */
import BottomNav from "../../components/BottomNav";
import Chat from "../../components/Chat";
import Box from "@mui/material/Box";
import MenuAppBar from "../../components/Navbar";
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

const Chatting = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar></MenuAppBar>
        <Chat></Chat>
        <BottomNav></BottomNav>
      </Box>
    </ThemeProvider>
  );
};

export default Chatting;