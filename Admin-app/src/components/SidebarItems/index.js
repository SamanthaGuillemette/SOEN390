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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
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
    <Link className="SIDEBAR__link" to="/">
      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <DashboardIcon className="SIDEBAR__icon"/>
        </ListItemIcon>
        <ListItemText className="SIDEBAR__text" primary="Dashboard" />
      </ListItem>
    </Link>

    <Link className="SIDEBAR__link" to="/appointments">
      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <EventIcon className="SIDEBAR__icon"/>
        </ListItemIcon>
        <ListItemText className="SIDEBAR__text" primary="Appointments" />
      </ListItem>
    </Link>

    <Link className="SIDEBAR__link" to="/patients">
      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <PeopleIcon className="SIDEBAR__icon"/>
        </ListItemIcon>
        <ListItemText className="SIDEBAR__text" primary="Patients" />
      </ListItem>
    </Link>

    <Link className="SIDEBAR__link" to="/admin">
      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <ManageAccountsIcon className="SIDEBAR__icon"/>
        </ListItemIcon>
        <ListItemText className="SIDEBAR__text" primary="Manage Accounts" />
      </ListItem>
    </Link>

    <Link className="SIDEBAR__link" to="inbox">
      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <MailIcon className="SIDEBAR__icon"/>
        </ListItemIcon>
        <ListItemText className="SIDEBAR__text" primary="Inbox" />
      </ListItem>
    </Link>

    <Link className="SIDEBAR__link" to="testing">
      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <NotificationsIcon className="SIDEBAR__icon"/>
        </ListItemIcon>
        <ListItemText className="SIDEBAR__text" primary="Updates" />
      </ListItem>
    </Link>

    <Link className="SIDEBAR__link" to="QR">
      <ListItem button className="SIDEBAR__button">
        <ListItemIcon>
          <QrCodeIcon className="SIDEBAR__icon"/>
        </ListItemIcon>
        <ListItemText className="SIDEBAR__text" primary="QR Code" />
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
