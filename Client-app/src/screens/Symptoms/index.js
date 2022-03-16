/**
 * @fileoverview This component takes care of displaying the Symptoms page.
 *
 */

import Box from "@mui/material/Box";
import SymptomsTable from "../../components/SymptomsTable";
import BottomNav from "../../components/BottomNav";
import MenuAppBar from "../../components/Navbar";

const Symptoms = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <SymptomsTable />
        <BottomNav />
      </Box>
  );
}

export default Symptoms;
