/**
 * @fileoverview This component takes care of displaying the profile page.
 *
 */

import Box from "@mui/material/Box";
import ClientProfile from "../../components/ClientProfile";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

const Profile = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <ClientProfile />
        <BottomNav />
      </Box>
  );
};

export default Profile;
