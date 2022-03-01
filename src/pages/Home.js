import { IconButton, Container, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/styles";

import useFetch from "../hooks/useFetch";
import HomeNavigation from "../components/HomeNavigation";
import BoardingHouseList from "../components/lists/BoardingHouseList";
import LoadingState from "../components/LoadingState";
import AllByZone from "../components/lists/AllByZone";
import { domain } from "../fetch-url/fetchUrl";
import { AddCircle } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

function TabPanel(props) {
   const { children, value, index, ...other } = props;
   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
         {...other}
      >
         {value === index && <Box>{children}</Box>}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.any.isRequired,
   value: PropTypes.any.isRequired,
};

function a11yProps(index) {
   return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
   };
}

const Home = ({ handleDrawerToggle }) => {
   const history = useHistory();
   const [value, setValue] = useState(0);
   const theme = useTheme();
   const {
      data: allBoardinghouses,
      isPending: isAllBoardinghousePending,
      error: allBoardinghouseError,
   } = useFetch(`${domain}/api/boarding-houses/all`);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const handleChangeIndex = (index) => {
      setValue(index);
   };

   function NavigationTabs() {
      return (
         <Tabs
            allowScrollButtonsMobile={true}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs"
            sx={{
               borderBottom: "1px solid rgba(0,0,0,0.2)",

               "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: "1.5rem 1.5rem 0 0 ",
               },
            }}
         >
            <Tooltip
               title="All Boarding house"
               TransitionComponent={Zoom}
               enterDelay={900}
            >
               <Tab label="ALL" {...a11yProps(0)} />
            </Tooltip>
            <Tooltip
               title="UEP Zone 1 Boarding house"
               TransitionComponent={Zoom}
               enterDelay={900}
            >
               <Tab label=" UEP Zone 1" {...a11yProps(1)} />
            </Tooltip>
            <Tooltip
               title="UEP Zone 2 Boarding houses"
               TransitionComponent={Zoom}
               enterDelay={900}
            >
               <Tab label="UEP Zone 2" {...a11yProps(3)} />
            </Tooltip>
            <Tooltip
               title="UEP Zone 3 Boarding houses"
               TransitionComponent={Zoom}
               enterDelay={900}
            >
               <Tab label="UEP Zone 3" {...a11yProps(3)} />
            </Tooltip>
         </Tabs>
      );
   }
   return (
      <Container disableGutters maxWidth="xl" sx={{ minHeight: "100vh" }}>
         <IconButton
            onClick={() => history.push("/admin/boarding-houses/add")}
            size="large"
            sx={{ position: "absolute", bottom: 10, right: 10 }}
         >
            <AddCircle sx={{ height: "2.5rem", width: "2.5rem" }} />
         </IconButton>
         <HomeNavigation
            title="Boarding Houses"
            handleDrawerToggle={handleDrawerToggle}
         ></HomeNavigation>
         <Box sx={{ bgcolor: "#fff" }}>
            <NavigationTabs />
         </Box>
         <Box sx={{ pb: 5, pt: 1 }}>
            <SwipeableViews
               axis={theme.direction === "rtl" ? "x-reverse" : "x"}
               index={value}
               onChangeIndex={handleChangeIndex}
            >
               <TabPanel value={value} index={0} dir={theme.direction}>
                  <Box
                     sx={{
                        minHeight: "60vh",
                        paddingBottom: "5rem",
                     }}
                  >
                     <Box
                        p={1}
                        pb={8}
                        px={2}
                        style={{ maxWidth: "75rem", margin: "0 auto" }}
                     >
                        {allBoardinghouseError && (
                           <Typography variant="overline" color="initial">
                              {allBoardinghouseError}
                           </Typography>
                        )}
                        {isAllBoardinghousePending && <LoadingState />}
                        {allBoardinghouses && (
                           <BoardingHouseList
                              boardinghouses={allBoardinghouses}
                           />
                        )}
                     </Box>
                  </Box>
               </TabPanel>

               <TabPanel value={value} index={1} dir={theme.direction}>
                  <Box
                     sx={{
                        minHeight: "60vh",
                        paddingBottom: "5rem",
                     }}
                  >
                     <Box
                        p={1}
                        pb={8}
                        px={2}
                        style={{ maxWidth: "75rem", margin: "0 auto" }}
                     >
                        <AllByZone zone="zone-1" />
                     </Box>
                  </Box>
               </TabPanel>
               <TabPanel value={value} index={2} dir={theme.direction}>
                  <Box
                     sx={{
                        minHeight: "60vh",
                        paddingBottom: "5rem",
                     }}
                  >
                     <Box
                        p={1}
                        pb={8}
                        px={2}
                        style={{ maxWidth: "75rem", margin: "0 auto" }}
                     >
                        <AllByZone zone="zone-2" />
                     </Box>
                  </Box>
               </TabPanel>
               <TabPanel value={value} index={3} dir={theme.direction}>
                  <Box
                     sx={{
                        minHeight: "60vh",
                        paddingBottom: "5rem",
                     }}
                  >
                     <Box
                        p={1}
                        pb={8}
                        px={2}
                        style={{ maxWidth: "75rem", margin: "0 auto" }}
                     >
                        <AllByZone zone="zone-3" />
                     </Box>
                  </Box>
               </TabPanel>
            </SwipeableViews>
         </Box>
      </Container>
   );
};

export default Home;
