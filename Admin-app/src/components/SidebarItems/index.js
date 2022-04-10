/**
 * @fileoverview This component takes care of the sidebarItems.
 *
 */
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../../backend/firebase";
import Badge from "@mui/material/Badge";
import { signOut } from "firebase/auth";
import "./SidebarItems.css";
import { useSelector } from "react-redux";
import { selectUserInfoDetails } from "../../store/userInfoSlice";

/**
 * Handle logging user out.
 * @param  {ClickEvent} e
 */
const logout = async (e) => {
  e.preventDefault();
  signOut(auth);
};

/**
 * This component is what allows the mainListItems feature to be displayed.
 * @returns {JSX.Element}
 */
export function MainListItems() {
  const userInfoDetails = useSelector(selectUserInfoDetails);

  // Different roles for differennt visibilities. Boolean types.
  const doctorRole = userInfoDetails?.role === "Doctor";
  const healthOfficialRole = userInfoDetails?.role === "Health Official";
  const immOfficerRole = userInfoDetails?.role === "Immigration Officer";
  const superAdmin = userInfoDetails?.role === "Administrator";

  return (
    <>
      <Link className="SIDEBAR__link" to="/">
        <ListItem button className="SIDEBAR__button">
          <ListItemIcon>
            <DashboardIcon className="SIDEBAR__icon" />
          </ListItemIcon>
          <ListItemText className="SIDEBAR__text" primary="Dashboard" />
        </ListItem>
      </Link>

      {superAdmin && (
        <Link className="SIDEBAR__link" to="/admin">
          <ListItem button className="SIDEBAR__button">
            <ListItemIcon>
              <ManageAccountsIcon className="SIDEBAR__icon" />
            </ListItemIcon>
            <ListItemText className="SIDEBAR__text" primary="Manage Accounts" />
          </ListItem>
        </Link>
      )}

      {doctorRole | superAdmin | healthOfficialRole | immOfficerRole && (
        <Link className="SIDEBAR__link" to="/patients">
          <ListItem button className="SIDEBAR__button">
            <ListItemIcon>
              <PeopleIcon className="SIDEBAR__icon" />
            </ListItemIcon>
            <ListItemText className="SIDEBAR__text" primary="Patients" />
          </ListItem>
        </Link>
      )}

      {doctorRole && (
        <Link className="SIDEBAR__link" to="/appointments">
          <ListItem button className="SIDEBAR__button">
            <ListItemIcon>
              <EventIcon className="SIDEBAR__icon" />
            </ListItemIcon>
            <ListItemText className="SIDEBAR__text" primary="Appointments" />
          </ListItem>
        </Link>
      )}

      {doctorRole && (
        <Link className="SIDEBAR__link" to="inbox">
          <ListItem button className="SIDEBAR__button">
            <ListItemIcon>
              <MailIcon className="SIDEBAR__icon" />
            </ListItemIcon>
            <ListItemText className="SIDEBAR__text" primary="Inbox" />
          </ListItem>
        </Link>
      )}

      <Link className="SIDEBAR__link" to="updates">
        <ListItem button className="SIDEBAR__button">
          <ListItemIcon>
            <NotificationsIcon className="SIDEBAR__icon" />
          </ListItemIcon>
          <ListItemText className="SIDEBAR__text" primary="Updates" />
        </ListItem>
      </Link>

      <Link className="SIDEBAR__link" to="QR">
        <ListItem button className="SIDEBAR__button">
          <ListItemIcon>
            <QrCodeIcon className="SIDEBAR__icon" />
          </ListItemIcon>
          <ListItemText className="SIDEBAR__text" primary="QR Code" />
        </ListItem>
      </Link>

      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <AccountCircleIcon className="SIDEBAR__icon" />
        </ListItemIcon>
        <ListItemText
          className="SIDEBAR__text"
          primary={`${userInfoDetails?.firstName} ${userInfoDetails?.lastName}`}
        />
      </ListItem>

      <Link className="SIDEBAR__link" to="signin">
        <ListItem button className="SIDEBAR__button">
          <ListItemIcon>
            <LogoutIcon className="SIDEBAR__icon" />
          </ListItemIcon>
          <div onClick={logout} className="SIDEBAR__subheader">
            SIGN OUT
          </div>
        </ListItem>
      </Link>
    </>
  );
}
