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

export const mainListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link to="/appointments">
      <ListItem button>
        <ListItemIcon>
          <EventIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItem>
    </Link>

    <Link to="/patients">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItem>
    </Link>

    <Link to="inbox">
      <ListItem button>
        <ListItemIcon>
          <MailIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>
    </Link>

    <Link to="testing">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText primary="Test Component" />
      </ListItem>
    </Link>

    <Link to="QR">
      <ListItem button>
        <ListItemIcon>
          <QrCodeIcon sx={{color: "#767676"}}/>
        </ListItemIcon>
        <ListItemText primary="QR Code" />
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
