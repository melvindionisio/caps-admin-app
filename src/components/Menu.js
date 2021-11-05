import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
// import { Card, CardHeader, CardContent } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  list: {
    width: 250,
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

  closeContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid lightgrey",
    marginBottom: "1rem",
  },
  icons: {
    pointerEvents: "none",
  },
}));

export default function Menu({ handleDrawerToggle, menuOpen, anchor }) {
  const classes = useStyles();

  const SideContent = (anchor) => (
    <Box
      pb={2}
      className={clsx(classes.list, classes.container, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Box
        className={classes.closeContainer}
        onClick={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <IconButton size="medium" className={classes.closeButton}>
          <CloseIcon className={classes.icons} />
        </IconButton>
        <Divider />
      </Box>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="body1" component="span" color="textSecondary">
            Admin name
          </Typography>
          <Avatar>O</Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );

  return (
    <div>
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
      </SwipeableDrawer>
    </div>
  );
}
