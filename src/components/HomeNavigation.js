import { IconButton, Toolbar, Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import Menu from "./Menu";
import { Hidden } from "@mui/material";
import { Box } from "@material-ui/core";
import { grey } from "@mui/material/colors";
import AccountMenu from "./AccountMenu";

const HomeNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <React.Fragment>
      <Menu
        handleDrawerToggle={handleDrawerToggle}
        menuOpen={menuOpen}
        anchor="left"
      />
      <AppBar position="sticky" elevation={1} sx={{ background: grey[900] }}>
        <Toolbar
          disableGutters
          sx={{
            padding: "0 .5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Hidden mdUp>
              <IconButton size="medium" onClick={handleDrawerToggle}>
                <MenuOutlinedIcon fontSize="medium" sx={{ color: "#777" }} />
              </IconButton>
            </Hidden>
            <Typography variant="button" sx={{ ml: 1 }}>
              Admin Panel
            </Typography>
          </Box>

          <AccountMenu />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HomeNavigation;
