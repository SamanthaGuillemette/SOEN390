import { IconButton } from "@mui/material";
import "./BottomNav.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import { Link } from "react-router-dom";
import React from "react";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const BottomNav = () => {
  return (
    <div className="bottomNav-container">
      <IconButton size="large" className="bottomNav-button">
        <Link to="../">
          <HomeRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
          <p className="bottomNav-iconTitle">Home</p>
        </Link>
      </IconButton>
      <Link className="client-profile" to="../ClientProfile">
        <IconButton size="large" className="bottomNav-button">
          <AccountCircleRoundedIcon
            className="bottomNav-icon"
            sx={{ color: "white" }}
          />
          <p className="bottomNav-iconTitle">Profile</p>
        </IconButton>
      </Link>
      <IconButton size="large" className="bottomNav-button">
        <MailRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Inbox</p>
      </IconButton>
      <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button className="bottomNav-button" variant="contained" {...bindTrigger(popupState)}>
          <MoreHorizRoundedIcon
            className="bottomNav-icon"
            sx={{ color: "white" }}
          />
          More
          </Button>
          <Popover 
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        </div>
      )}
    </PopupState>
    </div>
  );
};

export default BottomNav;
