/**
 * @fileoverview This component takes care of displaying the MyDoctor page.
 *
 */
import Box from "@mui/material/Box";
import DoctorInfo from "../../components/DoctorInfo";
import BottomNav from "../../components/BottomNav";
import MenuAppBar from "../../components/Navbar";

const MyDoctor = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <DoctorInfo />
        <BottomNav />
      </Box>
  );
};

export default MyDoctor;
