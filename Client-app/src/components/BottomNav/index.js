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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../store/drawerSlice";

const BottomNav = () => {
  // Dispatch function to call global 'openDrawer()' action from the store
  const dispatch = useDispatch();

  const handleDrawerMenu = () => {
    dispatch(openDrawer());
  };

  return (
    <div className="BOTTOM-NAV__container">
      <IconButton size="large" className="BOTTOM-NAV__btn" sx={{ mb: "10px" }}>
        <Link to="/">
          <HomeRoundedIcon sx={{ color: "white", mb: "-5px" }} />
          <p className="BOTTOM-NAV__btn__title">Home</p>
        </Link>
      </IconButton>
      <Link className="client-profile" to="/clientprofile">
        <IconButton size="large" className="BOTTOM-NAV__btn">
          <AccountCircleRoundedIcon sx={{ color: "white" }} />
          <p data-testid="profile" className="BOTTOM-NAV__btn__title">
            Profile
          </p>
        </IconButton>
      </Link>
      <Link to="/updates">
        <IconButton size="large" className="BOTTOM-NAV__btn">
          <NotificationsIcon sx={{ color: "white" }} />
          <p className="BOTTOM-NAV__btn__title">Updates</p>
        </IconButton>
      </Link>
      <IconButton
        size="large"
        className="BOTTOM-NAV__btn"
        onClick={handleDrawerMenu}
      >
        <MoreHorizIcon sx={{ color: "white" }} />
        <p className="BOTTOM-NAV__btn__title">More</p>
      </IconButton>
    </div>
  );
};

export default BottomNav;
