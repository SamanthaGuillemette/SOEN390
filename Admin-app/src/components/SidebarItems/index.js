import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";
import QrCodeIcon from '@mui/icons-material/QrCode'
import "./SidebarItems.css";

export const mainListItems = (
  <div>
    <Link className="sidebar-link" to="/">
      <ListItem button sx={{color: "transparent"}}>
        <ListItemIcon>
          <DashboardIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Dashboard" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="/appointments">
      <ListItem button sx={{color: "transparent"}}>
        <ListItemIcon>
          <EventIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Appointments" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="/patients">
      <ListItem button sx={{color: "transparent"}}>
        <ListItemIcon>
          <PeopleIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Patients" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="inbox">
      <ListItem button sx={{color: "transparent"}}>
        <ListItemIcon>
          <MailIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Inbox" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="testing">
      <ListItem button sx={{color: "transparent"}}>
        <ListItemIcon>
          <LayersIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText className="sidebar-text" primary="Test Component" />
      </ListItem>
    </Link>

    <Link className="sidebar-link" to="QR">
      <ListItem button sx={{color: "transparent"}}>
        <ListItemIcon>
          <QrCodeIcon sx={{color: "#767676"}}/>
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
