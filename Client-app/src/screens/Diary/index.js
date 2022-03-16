/**
 * @fileoverview This component takes care of displaying the Diary page.
 *
 */

import Box from "@mui/material/Box";
import DiaryTable from "../../components/Diary";
import BottomNav from "../../components/BottomNav";
import MenuAppBar from "../../components/Navbar";

const Diary = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <DiaryTable />
        <BottomNav />
      </Box>
  );
};

export default Diary;
