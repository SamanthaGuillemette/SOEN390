import Box from "@mui/material/Box";
import Dashboard from "../../components/Dashboard";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

const DashboardScreen = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar></MenuAppBar>
            <Dashboard></Dashboard>
            <BottomNav></BottomNav>
       </Box>
    );
};

export default DashboardScreen;