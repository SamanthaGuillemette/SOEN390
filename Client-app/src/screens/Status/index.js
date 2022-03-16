import Box from "@mui/material/Box";
import UpdateStatus from "../../components/UpdateStatus";
import BottomNav from "../../components/BottomNav";
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

const Status = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar></MenuAppBar>
        <UpdateStatus></UpdateStatus>
        <BottomNav></BottomNav>
      </Box>
    </ThemeProvider>
  );
};

export default Status;
