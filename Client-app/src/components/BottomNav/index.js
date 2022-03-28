/**
 * @fileoverview This component displays the bottom navigation bar.
 *
 */
import { IconButton } from "@mui/material";
import "./BottomNav.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import Button from '@mui/material/Button';
import { signOut } from "firebase/auth";
import { auth } from "../../backend/firebase";

const BottomNav = () => {

  /**
   * Handle logging user out.
   * @param  {ClickEvent} e
   */
  const logout = async (e) => {
    e.preventDefault();
    signOut(auth);
  };

  return (
    <div className="BOTTOM-NAV__container">
      <IconButton size="large" className="BOTTOM-NAV__btn" sx={{ mb: "10px" }}>
        <Link to="../">
          <HomeRoundedIcon sx={{ color: "white", mb: "-5px" }} />
          <p className="BOTTOM-NAV__btn__title">Home</p>
        </Link>
      </IconButton>
      <Link className="client-profile" to="../ClientProfile">
        <IconButton size="large" className="BOTTOM-NAV__btn">
          <AccountCircleRoundedIcon sx={{ color: "white" }} />
          <p data-testid="profile" className="BOTTOM-NAV__btn__title">
            Profile
          </p>
        </IconButton>
      </Link>
      <Link to="../notifications">
        <IconButton size="large" className="BOTTOM-NAV__btn">
          <NotificationsIcon sx={{ color: "white" }} />
          <p className="BOTTOM-NAV__btn__title">Notifications</p>
        </IconButton>
      </Link>
        <IconButton size="large" className="BOTTOM-NAV__btn" onClick={logout}>
          <LogoutIcon sx={{ color: "white" }} />
          <p className="BOTTOM-NAV__btn__title">Sign out</p>
        </IconButton>
    </div>
  );
};

export default BottomNav;
