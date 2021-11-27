import React from "react";
import HomeNavigation from "../components/HomeNavigation";
import { Container, Typography, Box } from "@mui/material";

const Dashboard = ({ handleDrawerToggle }) => {
  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
      <HomeNavigation
        title="dashboard"
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="initial">
          Total Bording house, boarding house by brgy,
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
