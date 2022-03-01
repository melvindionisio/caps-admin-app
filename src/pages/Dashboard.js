import React, { useEffect, useState, useRef } from "react";
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
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/system";
import useFetch from "../hooks/useFetch";
import { domain } from "../fetch-url/fetchUrl";

ChartJS.register(ArcElement, Tooltip, Legend);

const ZoneCard = ({ label, value, error, color }) => {
   return (
      <Grid item md={4} sm={6} xs={12}>
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
            {error ? (
               <Typography
                  variant="overline"
                  style={{
                     fontSize: ".6rem",
                     lineHeight: "8rem",
                     fontFamily: "Quicksand",
                     color: "red",
                  }}
               >
                  {value}
               </Typography>
            ) : (
               <Typography
                  variant="h6"
                  style={{
                     fontSize: "7rem",
                     lineHeight: "8rem",
                     fontFamily: "Quicksand",
                     color: `${color}`,
                  }}
                  color="text.secondary"
               >
                  {value}
               </Typography>
            )}

            <Typography
               variant="overline"
               color="text.secondary"
               style={{ fontSize: 15 }}
            >
               {label}
            </Typography>
         </Paper>
      </Grid>
   );
};

const Dashboard = ({ handleDrawerToggle }) => {
   const theme = useTheme();
   const zoneColors = [
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 205, 86)",
   ];
   //const [chartView, setChartView] = useState([]);
   const summaryRef = useRef(null);

   const [data, setData] = useState({
      labels: ["Zone 1", "Zone 2", "Zone 3"],
      datasets: [
         {
            label: "My First Dataset",
            data: [0, 0, 0],
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
   });

   const pieOptions = {
      plugins: {
         legend: {
            display: false,
            labels: {
               font: {
                  size: 14,
               },
            },
         },
         tooltip: {
            labels: {
               font: {
                  size: 20,
               },
            },
         },
      },
   };
   //useEffect(() => {
   //setChartView(summaryRef?.current?.legend?.legendItems);
   //}, []);

   const {
      data: boardinghouses,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/total`);

   const {
      data: zone1,
      isPending: zone1IsPending,
      error: zone1IsError,
   } = useFetch(`${domain}/api/boarding-houses/total/zone-1`);
   const {
      data: zone2,
      isPending: zone2IsPending,
      error: zone2IsError,
   } = useFetch(`${domain}/api/boarding-houses/total/zone-2`);
   const {
      data: zone3,
      isPending: zone3IsPending,
      error: zone3IsError,
   } = useFetch(`${domain}/api/boarding-houses/total/zone-3`);

   useEffect(() => {
      if (zone1 && zone2 && zone3) {
         setData({
            labels: ["Zone 1", "Zone 2", "Zone 3"],
            datasets: [
               {
                  label: "My First Dataset",
                  data: [zone1.total, zone2.total, zone3.total],
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
         });
      }
   }, [zone1, zone2, zone3]);
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
                        gap: 2,
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
                           borderRadius: "50%",
                           overflow: "hidden",
                        }}
                     >
                        <Pie
                           data={data}
                           options={pieOptions}
                           ref={summaryRef}
                        />
                        {/*
      {charView?.map((data: any, i: number) => (
          <Box display="flex" sx={{ mt: 2 }} key={i}>
                        <Box
              sx={{
                  height: 16,
                  width: 16,
                  background: `${data?.fillStyle}`,
                  borderRadius: 5,
                  mr: 0.5,
                  }}
              />
              	<Typography variant="body2"> {data?.text}</Typography>
              </Box>
		))}
                        */}
                     </Box>
                  </Box>
               </Grid>
               <Grid item lg={7} md={12} xs={12}>
                  <Box sx={{ pt: 2 }}>
                     <Slide in={true} direction="left">
                        <Box sx={{ mb: 2 }}>
                           <Card
                              sx={{ p: 0, pt: 0 }}
                              style={{}}
                              variant="outlined"
                           >
                              <CardHeader
                                 title={
                                    <>
                                       {error && (
                                          <Typography
                                             variant="overline"
                                             color="red"
                                             sx={{ fontFamily: "Quicksand" }}
                                             fontSize=".6rem"
                                          >
                                             {error}
                                          </Typography>
                                       )}
                                       {isPending && (
                                          <Typography
                                             variant="h4"
                                             as="span"
                                             color="text.secondary"
                                             style={{ fontWeight: "bold" }}
                                          >
                                             ...
                                          </Typography>
                                       )}
                                       {boardinghouses && (
                                          <Typography
                                             variant="h4"
                                             as="span"
                                             color="text.secondary"
                                             style={{
                                                fontWeight: "bold",
                                             }}
                                             sx={{
                                                fontSize: "5rem",
                                                p: 2,
                                             }}
                                          >
                                             {boardinghouses.total}
                                          </Typography>
                                       )}
                                    </>
                                 }
                                 subheader={
                                    <Typography
                                       variant="body1"
                                       color="text.secondary"
                                    >
                                       Total Registered Boarding Houses
                                    </Typography>
                                 }
                              />
                           </Card>
                        </Box>
                     </Slide>

                     <Slide in={true} direction="left">
                        <Grid container spacing={2}>
                           {zone1IsError && (
                              <ZoneCard
                                 label="UEP Zone 1"
                                 value={zone1IsError}
                                 error={true}
                              />
                           )}
                           {zone1IsPending && (
                              <ZoneCard label="UEP Zone 1" value={"..."} />
                           )}
                           {zone1 && (
                              <ZoneCard
                                 label="UEP Zone 1"
                                 value={zone1.total}
                                 color={zoneColors[0]}
                              />
                           )}

                           {zone2IsError && (
                              <ZoneCard
                                 label="UEP Zone 2"
                                 value={zone2IsError}
                                 error={true}
                              />
                           )}
                           {zone2IsPending && (
                              <ZoneCard label="UEP Zone 2" value={"..."} />
                           )}
                           {zone2 && (
                              <ZoneCard
                                 label="UEP Zone 2"
                                 value={zone2.total}
                                 color={zoneColors[1]}
                              />
                           )}

                           {zone3IsError && (
                              <ZoneCard
                                 label="UEP Zone 3"
                                 value={zone3IsError}
                                 error={true}
                              />
                           )}
                           {zone3IsPending && (
                              <ZoneCard label="UEP Zone 3" value={"..."} />
                           )}
                           {zone3 && (
                              <ZoneCard
                                 label="UEP Zone 3"
                                 value={zone3.total}
                                 color={zoneColors[2]}
                              />
                           )}
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
