import Box from "@mui/material/Box";
import UpdateStatus from "../../components/UpdateStatus";
import BottomNav from "../../components/BottomNav";
import MenuAppBar from "../../components/Navbar";

const Status = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar></MenuAppBar>
        <UpdateStatus></UpdateStatus>
        <BottomNav></BottomNav>
      </Box>
  );
};

export default Status;
