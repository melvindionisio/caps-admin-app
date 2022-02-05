import React, { useState } from "react";
import HomeNavigation from "../components/HomeNavigation";
import Container from "@mui/material/Container";

function Owners({ handleDrawerToggle }) {
   return (
      <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
         <HomeNavigation
            title="Owners"
            handleDrawerToggle={handleDrawerToggle}
         />
         <Container
            maxWidth="xl"
            sx={{ p: 2, pt: 5, pb: 5 }}
            disableGutters
         ></Container>
      </Container>
   );
}

export default Owners;
