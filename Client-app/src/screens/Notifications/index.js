/**
 * @fileoverview This component takes care of displaying the Notifications page.
 *
 */

import Box from "@mui/material/Box";
import Notifications from "../../components/Notifications";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

const NotificationsPage = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <Notifications />
        <BottomNav />
      </Box>
  );
};

export default NotificationsPage;
