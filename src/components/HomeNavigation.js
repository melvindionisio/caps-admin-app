import {
  IconButton,
  Toolbar,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { AppBar } from "@mui/material";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import Menu from "./Menu";
import { Hidden } from "@mui/material";
import { Box } from "@material-ui/core";
import { grey } from "@mui/material/colors";
import AccountMenu from "./AccountMenu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { useHistory, useLocation } from "react-router-dom";

const HomeNavigation = ({ title }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const history = useHistory();
  const location = useLocation();

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

  return (
    <React.Fragment>
      <Menu
        handleDrawerToggle={handleDrawerToggle}
        menuOpen={menuOpen}
        anchor="left"
      >
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
      </Menu>
      <AppBar position="sticky" elevation={1} sx={{ background: grey[900] }}>
        <Toolbar
          disableGutters
          sx={{
            padding: "0 .5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Hidden mdUp>
              <IconButton size="medium" onClick={handleDrawerToggle}>
                <MenuOutlinedIcon fontSize="medium" sx={{ color: "#777" }} />
              </IconButton>
            </Hidden>
            <Typography variant="h6" sx={{ ml: 2 }}>
              {title.toUpperCase()}
            </Typography>
          </Box>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HomeNavigation;
