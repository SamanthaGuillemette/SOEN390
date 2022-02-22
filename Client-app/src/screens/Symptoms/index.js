import Box from "@mui/material/Box";
import SymptomsTable from "../../components/SymptomsTable";
import BottomNav from "../../components/BottomNav";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "var(--background-secondary)",
    },
  },
});

const Symptoms = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <SymptomsTable></SymptomsTable>
        <BottomNav></BottomNav>
      </Box>
    </ThemeProvider>
  );
};

export default Symptoms;
