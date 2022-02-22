import { IconButton } from "@mui/material";
import "./BottomNav.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Link } from "react-router-dom";
import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const BottomNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


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
          <AccountCircleRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
          <p className="bottomNav-iconTitle">Profile</p>
        </IconButton>
      </Link>
      <IconButton size="large" className="bottomNav-button">
        <MailRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
        <p className="bottomNav-iconTitle">Inbox</p>
      </IconButton>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="bottomNav-button"
          >
            <MoreHorizRoundedIcon className="bottomNav-icon" sx={{ color: "white" }} />
            More
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem className="more-dropdown" onClick={handleClose}>Logout</MenuItem>
          </Menu>
    </div>
  );
};

export default BottomNav;