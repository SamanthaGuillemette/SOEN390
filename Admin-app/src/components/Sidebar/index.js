/**
 * @fileoverview This component takes care of the Sidebar function.
 *
 */
import { mainListItems, secondaryListItems, SecondMainListItems} from "../SidebarItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { openDrawer, openState } from "../../store/drawerSlice";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "var(--background-main)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

/**
 * This component is what allows the Sidebar feature to be displayed. 
 */
function Sidebar() {
  // const [open, setOpen] = useState(true);

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };
  const open = useSelector(openState);
  const dispatch = useDispatch();

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        {/* <IconButton onClick={toggleDrawer}> */}
        <IconButton sx={{color: "var(--text-inactive)"}} onClick={() => dispatch(openDrawer())}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <SecondMainListItems/>
      <Divider />
      <List>{secondaryListItems}</List>
    </Drawer>
  );
}

export default Sidebar;
