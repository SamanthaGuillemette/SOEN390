import QR from "../../components/QR";
import MenuAppBar from "../../components/Navbar";
import Box from "@mui/material/Box";

const QRPage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuAppBar></MenuAppBar>
            <QR></QR>
       </Box>
    );
};

export default QRPage;