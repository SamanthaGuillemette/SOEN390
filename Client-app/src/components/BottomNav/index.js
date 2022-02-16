import { IconButton } from "@mui/material";
import "./BottomNav.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const BottomNav = () => {
  return (
    <div className="bottomNav-container">
      <IconButton size="large" className="bottomNav-button">
        <HomeRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Home</p>
      </IconButton>
      <IconButton size="large" className="bottomNav-button">
        <AccountCircleRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Profile</p>
      </IconButton>
      <IconButton size="large" className="bottomNav-button">
        <MailRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Inbox</p>
      </IconButton>
      <IconButton size="large" className="bottomNav-button">
        <MoreHorizRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">More</p>
      </IconButton>
    </div>
  );
};

export default BottomNav;