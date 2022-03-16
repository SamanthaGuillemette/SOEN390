/**
 * @fileoverview This component takes care of displaying the QR code page.
 *
 */

import Box from "@mui/material/Box";
import QR from "../../components/QR";
import MenuAppBar from "../../components/Navbar";
import BottomNav from "../../components/BottomNav";

const QRPage = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <MenuAppBar />
        <QR />
        <BottomNav />
      </Box>
  );
};

export default QRPage;
