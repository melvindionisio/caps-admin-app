import React from "react";
import HomeNavigation from "../components/HomeNavigation";
import {
  Container,
  Typography,
  Box,
  Grid,
  Slide,
  CardHeader,
  Card,
  Paper,
  CardContent,
  Button,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { useTheme } from "@mui/system";
Chart.register(ArcElement);

const Dashboard = ({ handleDrawerToggle }) => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 100, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        radius: 210,
        borderColor: "transparent",
        offset: 5,
      },
    ],
  };
  const displayData = [
    {
      label: "UEP Zone 1",
      value: 100,
      link: "/my/boarding-house/",
    },
    {
      label: "UEP Zone2",
      value: 50,
      link: "/my/boarding-house/",
    },
    {
      label: "UEP Zone 3",
      value: 100,
      link: "/my/boarding-house/",
    },
  ];

  const theme = useTheme();

  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
      <HomeNavigation
        title="dashboard"
        handleDrawerToggle={handleDrawerToggle}
      />
      <Container maxWidth="xl" sx={{ p: 2, pt: 5, pb: 5 }} disableGutters>
        <Grid container spacing={2} style={{ alignItems: "center" }}>
          <Grid item lg={5} md={12} xs={12}>
            <Box
              elevation={0}
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                as="p"
                textAlign="center"
                color="text.secondary"
                style={{ fontFamily: "Quicksand" }}
              >
                BOARDING HOUSES
              </Typography>
              <Box
                sx={{
                  [theme.breakpoints.up("lg")]: {
                    height: 450,
                    width: 450,
                  },
                  height: 250,
                  width: 250,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBotton: 2,
                }}
              >
                <Pie data={data} />
              </Box>
            </Box>
          </Grid>
          <Grid item lg={7} md={12} xs={12}>
            <Box sx={{ pt: 2 }}>
              <Slide in={true} direction="left">
                <Box sx={{ mb: 2 }}>
                  <Card sx={{ p: 0, pt: 0 }} style={{}} variant="outlined">
                    <CardHeader
                      title={
                        <Typography
                          variant="h4"
                          as="span"
                          color="text.secondary"
                          style={{ fontWeight: "bold" }}
                        >
                          250
                        </Typography>
                      }
                      subheader={
                        <Typography variant="body1" color="text.secondary">
                          Total Registered Boarding Houses
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography>Address</Typography>
                      <Typography>Contact number</Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Slide>

              <Slide in={true} direction="left">
                <Grid container spacing={2}>
                  {displayData.map((data) => (
                    <Grid item md={4} sm={6} xs={12} key={data.label}>
                      <Paper
                        variant="outlined"
                        style={{
                          height: 220,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: "7rem",
                            lineHeight: "8rem",
                            fontFamily: "Quicksand",
                          }}
                          color="text.secondary"
                        >
                          {data.value}
                        </Typography>
                        <Typography
                          variant="overline"
                          color="text.secondary"
                          style={{ fontSize: 15 }}
                        >
                          {data.label}
                        </Typography>
                        <Button
                          variant="contained"
                          disableElevation
                          color="secondary"
                          fullWidth
                          style={{ marginBottom: "-16px", borderRadius: 0 }}
                        >
                          VIEW
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Slide>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Dashboard;
