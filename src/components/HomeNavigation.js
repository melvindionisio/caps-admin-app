import {
  IconButton,
  Toolbar,
  Typography,
  // ListItem,
  // ListItemText,
  // ListItemIcon,
  // ListItemButton,
} from "@mui/material";
import { AppBar } from "@mui/material";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { Hidden } from "@mui/material";
// import { Box } from "@material-ui/core";
import { grey } from "@mui/material/colors";
import AccountMenu from "./AccountMenu";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import OtherHousesIcon from "@mui/icons-material/OtherHouses";
// import ImportExportIcon from "@mui/icons-material/ImportExport";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const HomeNavigation = ({ title, handleDrawerToggle }) => {
  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={1} sx={{ background: grey[900] }}>
        <Toolbar
          disableGutters
          sx={{
            padding: "0 .5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "3.5rem",
          }}
        >
          {/* <Box sx={{ display: "flex" }}> */}
          <Hidden mdUp>
            <IconButton size="medium" onClick={handleDrawerToggle}>
              <MenuOutlinedIcon fontSize="medium" sx={{ color: "#777" }} />
            </IconButton>
          </Hidden>
          <Typography variant="h6" sx={{ ml: 2 }}>
            {title.toUpperCase()}
          </Typography>
          {/* </Box> */}
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HomeNavigation;
