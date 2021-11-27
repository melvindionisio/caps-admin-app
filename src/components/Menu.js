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
import { Typography } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { grey } from "@material-ui/core/colors";
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
      text: "Boarding Houses",
      path: "/admin/boarding-house",
      icon: <OtherHousesIcon />,
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
            }}
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
            divider
          >
            <Typography variant="body1" style={{ fontFamily: "Quicksand" }}>
              SEARCH 'N STAY
            </Typography>
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
