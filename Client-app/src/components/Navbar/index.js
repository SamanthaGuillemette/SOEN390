/**
 * @fileoverview This component displays the navigation bar and the drawer.
 *
 */
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import "./Navbar.css";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  MuiDrawer: {
    background: "rgba(15, 15, 15, 0.8) !important",
    borderRight: "1px solid rgba(74, 207, 248, 0.3)",
    borderRadius: "10px",
  },
});

const MenuAppBar = () => {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const toggleDrawer = () => {
    setState(!state);
  };

  /**
   * Create the drawer menu
   * @returns {JSX.Element}
   */
  const list = () => (
    <Box
      sx={{ width: 250, pt: 5, pl: 2}}
      role="presentation"
      onClick={toggleDrawer}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem className="sidebar-button"button key={text}>
            <ListItemIcon className="sidebar-icon">
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText className="sidebar-text" primary={text} />
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
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

            <Drawer
              classes={{ paper: classes.MuiDrawer }}
              anchor="left"
              open={state}
              onClose={toggleDrawer}
            >
              {list()}
            </Drawer>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default MenuAppBar;
