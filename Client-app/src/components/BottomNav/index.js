import { IconButton } from "@mui/material";
import "./BottomNav.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState from "material-ui-popup-state";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../backend/firebase";

const BottomNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const setMobileMoreAnchorEl = useState(null);

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
    <div className="BOTTOM-NAV__container">
      <IconButton size="large" className="BOTTOM-NAV__btn" sx={{ mb: "10px" }}>
        <Link to="../">
          <HomeRoundedIcon sx={{ color: "white", mb: "-5px" }}/>
          <p className="BOTTOM-NAV__btn__title">Home</p>
        </Link>
      </IconButton>
      <Link className="client-profile" to="../ClientProfile">
        <IconButton size="large" className="BOTTOM-NAV__btn">
          <AccountCircleRoundedIcon sx={{ color: "white" }}/>
          <p data-testid="profile" className="BOTTOM-NAV__btn__title">
            Profile
          </p>
        </IconButton>
      </Link>
      <Link to="../notifications">
        <IconButton size="large" className="BOTTOM-NAV__btn">
          <NotificationsIcon sx={{ color: "white" }} />
          <p className="BOTTOM-NAV__btn__title">
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
              className="BOTTOM-NAV__btn"
            >
              <MoreHorizRoundedIcon sx={{ color: "white" }}/>
              <p className="BOTTOM-NAV__btn__title">More</p>
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
                className="BOTTOM-NAV__popover__text"
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
