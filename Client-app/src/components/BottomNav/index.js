import { IconButton } from "@mui/material";
import "./BottomNav.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="bottomNav-container">
      <IconButton size="large" className="bottomNav-button">
        <HomeRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Home</p>
      </IconButton>
      <Link className="client-profile" to="../ClientProfile">
        <IconButton size="large" className="bottomNav-button">
          <AccountCircleRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
          <p className="bottomNav-iconTitle">Profile</p>
        </IconButton>
      </Link>
      <IconButton size="large" className="bottomNav-button">
        <MailRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Inbox</p>
      </IconButton>
      <IconButton size="large" className="bottomNav-button">
        <MoreHorizRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">More</p>
      </IconButton>
    </div>
  );
};

export default BottomNav;