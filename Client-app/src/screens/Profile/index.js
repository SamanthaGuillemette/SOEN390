import Box from "@mui/material/Box";
import ClientProfile from "../../components/ClientProfile";
import MenuAppBar from "../../components/Navbar";

const Profile = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar></MenuAppBar>
            <ClientProfile></ClientProfile>
       </Box>
    );
};

export default Profile;