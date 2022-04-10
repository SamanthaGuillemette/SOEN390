/**
 * @fileoverview This component displays the navigation bar and the drawer.
 *
 */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import EventIcon from "@mui/icons-material/Event";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import MailIcon from "@mui/icons-material/Mail";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./Navbar.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, selectDrawerState } from "../../store/drawerSlice";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../backend/firebase";

const useStyles = makeStyles({
  MuiDrawer: {
    background: "rgba(23, 23, 23, 0.95) !important",
    borderRight: "1px solid rgb(80, 80, 80)",
    borderRadius: "0 20px 20px 0",
  },
});

const MenuAppBar = () => {
  const classes = useStyles();

  // Global 'drawerState' being pulled from Redux store
  const drawerState = useSelector(selectDrawerState);

  // Dispatch function to call global 'openDrawer()' action from the store
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(openDrawer());
  };

  /**
   * Handle logging user out.
   * @param  {ClickEvent} e
   */
  const logout = async (e) => {
    e.preventDefault();
    signOut(auth);
  };

  /**
   * Create the drawer menu
   * @returns {JSX.Element}
   */
  const list = () => (
    <Box
      sx={{ width: 230, pt: 5, px: 2 }}
      // role="presentation"
      onClick={toggleDrawer}
    >
      <List>
        <Link to="/appointment">
          <ListItem>
            <ListItemIcon className="sidebar-icon">
              <EventIcon />
            </ListItemIcon>
            <ListItemText className="sidebar-text">Appointment</ListItemText>
          </ListItem>
        </Link>

        <Link to="/symptoms">
          <ListItem>
            <ListItemIcon className="sidebar-icon">
              <CoronavirusIcon />
            </ListItemIcon>
            <ListItemText className="sidebar-text">Status History</ListItemText>
          </ListItem>
        </Link>

        <Link to="/diary">
          <ListItem>
            <ListItemIcon className="sidebar-icon">
              <NoteAltIcon />
            </ListItemIcon>
            <ListItemText className="sidebar-text">Diary</ListItemText>
          </ListItem>
        </Link>

        <Link to="/clientinbox">
          <ListItem>
            <ListItemIcon className="sidebar-icon">
              <MailIcon />
            </ListItemIcon>
            <ListItemText className="sidebar-text">Inbox</ListItemText>
          </ListItem>
        </Link>

        <Link to="/qr">
          <ListItem>
            <ListItemIcon className="sidebar-icon">
              <QrCodeIcon />
            </ListItemIcon>
            <ListItemText className="sidebar-text">QR Code</ListItemText>
          </ListItem>
        </Link>

        <Link to="/mydoctor">
          <ListItem>
            <ListItemIcon className="sidebar-icon">
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText className="sidebar-text">My Doctor</ListItemText>
          </ListItem>
        </Link>

        <Link to="/status">
          <ListItem>
            <ListItemIcon className="sidebar-icon">
              <MonitorHeartIcon />
            </ListItemIcon>
            <ListItemText className="sidebar-text">Update Status</ListItemText>
          </ListItem>
        </Link>

        <div className="sidebar-divider" />

        <ListItem onClick={logout} className="sidebar-logout">
          <ListItemIcon className="sidebar-icon">
            <ExitToAppIcon />
          </ListItemIcon>
          <p className="sidebar-logout_text">SIGN OUT</p>
        </ListItem>
      </List>
    </Box>
  );

  return (
    // <ClickAwayListener onClickAway={toggleDrawer}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: "var(--background-secondary)",
            boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            data-testid="title"
            variant="h6"
            component="div"
            color="var(--text-primary)"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Covid-19 App
          </Typography>

          <Drawer
            classes={{ paper: classes.MuiDrawer }}
            anchor="left"
            open={drawerState}
            onClose={toggleDrawer}
          >
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
    // </ClickAwayListener>
  );
};
export default MenuAppBar;
