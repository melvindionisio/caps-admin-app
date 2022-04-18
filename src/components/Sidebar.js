import {
   AppBar,
   Drawer,
   List,
   Toolbar,
   Typography,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListItemButton,
   Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { grey, amber } from "@mui/material/colors";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupsIcon from "@mui/icons-material/Groups";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import logo from "../sns-logo.png";
import { Avatar } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
   drawer: {
      width: drawerWidth,
   },
   drawerPaper: {
      width: drawerWidth,
      background: grey[100],
   },
}));

const Sidebar = () => {
   const classes = useStyles();
   const location = useLocation();
   const history = useHistory();
   const menuItems = [
      {
         text: "Dashboard",
         path: "/admin/dashboard",
         icon: <DashboardIcon />,
      },
      {
         text: "Owners",
         path: "/admin/owners",
         icon: <GroupsIcon />,
      },
      {
         text: "Boarding Houses",
         path: "/admin/boarding-houses",
         icon: <OtherHousesIcon />,
      },
      {
         text: "Pending Reviews",
         path: "/admin/pending-reviews",
         icon: <PendingActionsIcon />,
      },
      {
         text: "Add Boarding House",
         path: "/admin/boarding-houses/add",
         icon: <AddCircleIcon />,
      },
      {
         text: "Export",
         path: "/admin/export",
         icon: <ImportExportIcon />,
      },
      {
         text: "Profile",
         path: "/admin/profile",
         icon: <ManageAccountsIcon />,
      },
   ];
   return (
      <Drawer
         anchor="left"
         variant="permanent"
         className={classes.drawer}
         classes={{
            paper: classes.drawerPaper,
         }}
         sx={
            location.pathname === "/login"
               ? { display: "none" }
               : { display: "flex" }
         }
      >
         <AppBar position="static" elevation={1} color="default">
            <Toolbar
               sx={{ padding: "0 .7rem", display: "flex", gap: 1 }}
               disableGutters
            >
               <Avatar
                  src={logo}
                  style={{ height: "1.7rem", width: "1.7rem" }}
               ></Avatar>
               <Box sx={{ position: "relative" }}>
                  <Typography
                     variant="body1"
                     component="h1"
                     sx={{ fontFamily: "Quicksand" }}
                  >
                     SEARCH 'N STAY
                  </Typography>
                  <Typography
                     variant="caption"
                     component="span"
                     sx={{
                        position: "absolute",
                        right: "-3.2rem",
                        top: -1,
                        borderRadius: 1,
                        outline: `1px solid ${amber[500]}`,
                        background: amber[50],
                        px: 0.5,
                        fontWeight: "bold",
                        fontFamily: "Quicksand",
                     }}
                  >
                     admin
                  </Typography>
               </Box>
            </Toolbar>
         </AppBar>
         <List>
            {menuItems.map((item) => (
               <ListItem
                  button
                  divider
                  disablePadding
                  onClick={() => history.push(item.path)}
                  sx={
                     location.pathname === item.path
                        ? {
                             background: grey[300],
                             color: grey[900],
                          }
                        : { background: "transparent" }
                  }
                  key={item.text}
               >
                  <ListItemButton>
                     <ListItemIcon
                        sx={
                           location.pathname === item.path
                              ? { color: grey[800] }
                              : { color: grey[500] }
                        }
                     >
                        {item.icon}
                     </ListItemIcon>
                     <ListItemText primary={item.text} />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </Drawer>
   );
};

export default Sidebar;
