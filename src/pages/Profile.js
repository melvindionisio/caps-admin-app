import React from "react";
import HomeNavigation from "../components/HomeNavigation";
import { Container, Typography, Box } from "@mui/material";

const Profile = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <HomeNavigation title="profile" />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="initial">
          Profile
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
