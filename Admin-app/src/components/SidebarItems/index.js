/**
 * @fileoverview This component takes care of the sidebarItems.
 *
 */
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";
import QrCodeIcon from '@mui/icons-material/QrCode'
import "./SidebarItems.css";

/**
 * This component is what allows the mainListItems feature to be displayed. 
 * @returns {JSX.Element}
 */
export const mainListItems = (
  <div>
    <Link className="sidebar-link" to="/">
      <ListItem button className="sidebar-button">
        <ListItemIcon>
          <DashboardIcon className="sidebar-icon"/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Dashboard" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="/appointments">
      <ListItem button className="sidebar-button">
        <ListItemIcon>
          <EventIcon className="sidebar-icon"/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Appointments" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="/patients">
      <ListItem button className="sidebar-button">
        <ListItemIcon>
          <PeopleIcon className="sidebar-icon"/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Patients" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="inbox">
      <ListItem button className="sidebar-button">
        <ListItemIcon>
          <MailIcon className="sidebar-icon"/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Inbox" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="testing">
      <ListItem button className="sidebar-button">
        <ListItemIcon>
          <NotificationsIcon className="sidebar-icon"/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Updates" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="QR">
      <ListItem button className="sidebar-button">
        <ListItemIcon>
          <QrCodeIcon className="sidebar-icon"/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="QR Code" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader> */}
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
