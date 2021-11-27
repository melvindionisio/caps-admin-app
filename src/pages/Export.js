import React from "react";
import HomeNavigation from "../components/HomeNavigation";
import { Container, Typography, Box } from "@mui/material";

const Export = ({ handleDrawerToggle }) => {
  return (
    <Container maxWidth="xl" disableGutters>
      <HomeNavigation title="Export" handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="initial">
          This is where the admin can export all the list of current saved
          registed boarding house into a pdf or word document.
        </Typography>
      </Box>
    </Container>
  );
};

export default Export;
