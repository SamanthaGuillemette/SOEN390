/**
 * @fileoverview This component displays the dashboard page.
 *
 */
import Box from "@mui/material/Box";
import Dashboard from "../../components/Dashboard";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

const DashboardScreen = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Dashboard />
      <BottomNav />
    </Box>
  );
};

export default DashboardScreen;
