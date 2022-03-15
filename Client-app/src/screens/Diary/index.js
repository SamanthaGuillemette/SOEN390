import Box from "@mui/material/Box";
import DiaryTable from "../../components/Diary";
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

const Diary = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar></MenuAppBar>
        <DiaryTable></DiaryTable>
        <BottomNav></BottomNav>
      </Box>
    </ThemeProvider>
  );
};

export default Diary;
