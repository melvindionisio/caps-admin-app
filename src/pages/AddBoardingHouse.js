import React from "react";
// import HomeNavigation from "../components/HomeNavigation";
import { Container, Paper, Zoom } from "@mui/material";
import BackNavbar from "../components/BackNavbar";
import { IconButton, Typography } from "@material-ui/core";
import AddBoardingHouseStepper from "../components/AddBoardingHouseStepper";

const AddBoardingHouse = () => {
  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
      <BackNavbar title="Add Boarding House">
        <IconButton></IconButton>
      </BackNavbar>
      <Container maxWidth="md" sx={{ p: 2, pt: 5, pb: 5 }} disableGutters>
        <Typography variant="body1" style={{ marginBottom: 10 }}>
          Here you can add new boarding house account for owner and can fill
          details but optional.
        </Typography>
        <Zoom in={true}>
          <Paper style={{ padding: 15 }} variant="outlined">
            <AddBoardingHouseStepper />
          </Paper>
        </Zoom>
      </Container>
    </Container>
  );
};

export default AddBoardingHouse;
