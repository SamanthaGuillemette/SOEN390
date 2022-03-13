import { IconButton } from "@mui/material";
import "./BottomNav.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../backend/firebase";

const BottomNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const logout = async (e) => {
    e.preventDefault();
    signOut(auth);
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <div className="bottomNav-container">
      <IconButton size="large" className="bottomNav-button" sx={{ mb: "10px" }}>
        <Link to="../">
          <HomeRoundedIcon
            className="bottomNav-icon"
            sx={{ color: "white", mb: "-5px" }}
          />
          <p className="bottomNav-iconTitle">Home</p>
        </Link>
      </IconButton>
      <Link className="client-profile" to="../ClientProfile">
        <IconButton size="large" className="bottomNav-button">
          <AccountCircleRoundedIcon
            className="bottomNav-icon"
            sx={{ color: "white" }}
          />
          <p data-testid="profile" className="bottomNav-iconTitle">
            Profile
          </p>
        </IconButton>
      </Link>
      <Link to="../notifications">
        <IconButton size="large" className="bottomNav-button">
          <NotificationsIcon className="bottomNav-icon" sx={{ color: "white" }} />
          <p className="bottomNav-iconTitle">
            Notifications
          </p>
        </IconButton>
      </Link>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              className="bottomNav-button"
            >
              <MoreHorizRoundedIcon
                className="bottomNav-icon"
                sx={{ color: "white" }}
              />
              <p className="bottomNav-iconTitle">More</p>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Typography
                data-testid="signout"
                className="popover-text"
                onClick={logout}
                sx={{ p: 2 }}
              >
                Signout
              </Typography>
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
};

export default BottomNav;
