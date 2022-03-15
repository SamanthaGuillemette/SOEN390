/**
 * @fileoverview This component displays chat screen.
 *
 */
import BottomNav from "../../components/BottomNav";
import Navbar from "../../components/Navbar";
import Chat from "../../components/Chat";
import Box from "@mui/material/Box";
import MenuAppBar from "../../components/Navbar";

const Chatting = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Chat />
      <BottomNav />
    </Box>
  );
};

export default Chatting;
