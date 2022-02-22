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
      <IconButton
        LinkComponent={Link}
        to="/"
        size="large"
        className="bottomNav-button"
      >
        <HomeRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Home</p>
      </IconButton>
      <IconButton
        LinkComponent={Link}
        to="/clientprofile"
        size="large"
        className="bottomNav-button"
      >
        <AccountCircleRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Profile</p>
      </IconButton>
      <IconButton
        LinkComponent={Link}
        to="/clientinbox"
        size="large"
        className="bottomNav-button"
      >
        <MailRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Inbox</p>
      </IconButton>
      <IconButton
        LinkComponent={Link}
        to="/"
        size="large"
        className="bottomNav-button"
      >
        <MoreHorizRoundedIcon sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">More</p>
      </IconButton>
    </div>
  );
};

export default BottomNav;
