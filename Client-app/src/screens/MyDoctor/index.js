/**
 * @fileoverview This component takes care of displaying the MyDoctor page.
 *
 */
import Box from "@mui/material/Box";
import DoctorInfo from "../../components/DoctorInfo";
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

const MyDoctor = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <DoctorInfo />
        <BottomNav />
      </Box>
    </ThemeProvider>
  );
};

export default MyDoctor;
