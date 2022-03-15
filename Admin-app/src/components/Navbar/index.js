/**
 * @fileoverview This component takes care of the Navbar function.
 *
 */
import { styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { openDrawer, openState } from "../../store/drawerSlice";
import { useState } from "react";
import { signOut } from 'firebase/auth';
import { auth } from '../../backend/firebase';
import { makeStyles } from "@material-ui/core/styles";
import ChatList from '../../screens/Inbox/ChatList.js';

const dropdownStyle = makeStyles(() => ({
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "var(--background-main)",
      color: "var(--text-inactive)",
      borderRadius: "10px",
    }
  }
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "var(--text-inactive)",
  backgroundColor: "var(--background-main)", 
  "&:hover": {
    color: "var(--text-primary)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/**
 * This component is what allows the navnar feature to work. Below are many consts and
 * functions to handle opening and closing the menus.
 */
function Navbar() {
  const classes = dropdownStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [msgMoreAnchorEl, setMsgMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMsgOpen = Boolean(msgMoreAnchorEl);

  const open = useSelector(openState);
  const dispatch = useDispatch();

  /**
   * Function to handle profile menu open
   * @param  {} event
   */
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Function to handle messages menu open
   * @param  {} event
   */
  const handleMessagesMenuOpen = (event) => {
    setMsgMoreAnchorEl(event.currentTarget);
  };

  /**
   * Function to handle messages menu close
   * @param  {} event
   */
  const handleMessagesMenuClose = (event) => {
    setMsgMoreAnchorEl(null);
  };

  /**
   * Function to handle mobile menu open
   */
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

   /**
   * Function to handle menu open
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

   /**
   * Function to handle mobile menu open
   * @param  {} event
   */
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const logout = async(e) => {
    e.preventDefault();
    signOut(auth);
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.menu}
    >
      <MenuItem 
      onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-inactive)'}
      onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem 
      onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-inactive)'}
      onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem 
      onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-inactive)'}
      onClick={logout}>Signout</MenuItem>
    </Menu>

  );

  const msgId = "primary-search-msg-menu";
  const renderMessages = (
    <Menu
      anchorEl={msgMoreAnchorEl}
      id={msgId}
      keepMounted
      open={isMsgOpen}
      onClose={handleMessagesMenuClose}
      className={classes.menu}
    >
      <ChatList />
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem  onClick={handleMessagesMenuOpen}>
        <IconButton 
          size="large" 
          aria-label="show 4 new mails" 
          aria-controls="primary-search-msg-menu"
          color="inherit"
          >
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        open={open}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
            backgroundColor: "var(--background-secondary)"
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(openDrawer())}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="var(--text-primary)"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Admin Dashboard
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleMessagesMenuOpen}
            >
              <Badge
                badgeContent={4}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "var(--background-secondary)",
                    backgroundColor: "var(--primary-main)"
                  }
                }}
              >
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge
                badgeContent={17}
                sx={{
                  "& .MuiBadge-badge": {
                    color: 'var(--background-secondary)',
                    backgroundColor: "var(--primary-main)"
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMessages}
      {renderMenu}
    </Box>
  );
}

export default Navbar;