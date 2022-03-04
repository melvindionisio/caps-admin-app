import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// import Button from "@material-ui/core/Button";
// import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import { Typography, Avatar } from "@mui/material";
import logo from "../sns-logo.png";

import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupsIcon from "@mui/icons-material/Groups";

import {
   List,
   ListItem,
   ListItemText,
   ListItemIcon,
   ListItemButton,
} from "@mui/material";
import { grey, amber } from "@mui/material/colors";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
   },
   list: {
      width: 270,
   },
   fullList: {
      width: "auto",
   },
   appBar: {
      [theme.breakpoints.up("sm")]: {
         // width: `calc(100% - ${drawerWidth}px)`,
         // marginLeft: drawerWidth,
      },
   },
   toolbar: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0rem 1.5rem",
   },
   closeButton: {
      padding: "1rem",
      alignSelf: "flex-end",
   },
   avatar: {
      height: 80,
      width: 80,
      margin: "auto",
   },
   fullWidth: {
      width: "85%",
      display: "block",
      alignSelf: "center",
   },

   menulist: {
      width: "85%",
   },
}));

export default function Menu({
   children,
   handleDrawerToggle,
   menuOpen,
   anchor,
}) {
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

   const SideContent = (anchor) => (
      <Box
         pb={2}
         className={clsx(classes.list, classes.container, {
            [classes.fullList]: anchor === "top" || anchor === "bottom",
         })}
         role="presentation"
      >
         {/* <Box
        className={classes.closeContainer}
        onClick={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <IconButton size="medium" className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
        <Divider />
      </Box>
      <Box className={classes.menulist}>{children}</Box> */}
         <Box
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
            sx={{ width: "100%" }}
         >
            <List sx={{ paddingTop: "0rem" }}>
               <ListItem
                  sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     paddingRight: 0.5,
                     mb: 1,
                  }}
                  onClick={handleDrawerToggle}
                  onKeyDown={handleDrawerToggle}
                  divider
               >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                     <Avatar
                        src={logo}
                        style={{ height: "1.7rem", width: "1.7rem" }}
                     ></Avatar>

                     <Box sx={{ position: "relative" }}>
                        <Typography
                           variant="body1"
                           style={{ fontFamily: "Quicksand" }}
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
                              fontWeight: "bold",
                              fontFamily: "Quicksand",
                              px: 0.5,
                           }}
                        >
                           admin
                        </Typography>
                     </Box>
                  </Box>
                  <IconButton
                     onClick={handleDrawerToggle}
                     onKeyDown={handleDrawerToggle}
                  >
                     <CancelIcon />
                  </IconButton>
               </ListItem>
               {/* {children} */}

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
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
         </Box>
         {/* <Box className={classes.menulist}>{children}</Box> */}
      </Box>
   );

   return (
      <SwipeableDrawer
         anchor={anchor}
         open={menuOpen}
         onClose={handleDrawerToggle}
         onOpen={handleDrawerToggle}
         ModalProps={{
            keepMounted: true, // Better open performance on mobile.
         }}
         hysteresis={0.1}
      >
         {SideContent(anchor)}
         {/*{children}*/}
      </SwipeableDrawer>
   );
}
