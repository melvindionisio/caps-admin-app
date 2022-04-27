import React, { useEffect, useState } from "react";
import {
   Container,
   IconButton,
   Button,
   Typography,
   Slide,
} from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BackNavbar from "../components/BackNavbar";
import { domain } from "../fetch-url/fetchUrl";
import LoadingState from "../components/LoadingState";

import About from "../components/SwipeablePages/About";
import Rooms from "../components/SwipeablePages/Rooms";
import Reviews from "../components/SwipeablePages/Reviews";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useTheme } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import Notification from "../components/Notification";
import useSessionStorage from "../hooks/useSessionStorage";

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

const BoardingHouse = () => {
   const { bhId } = useParams();
   const history = useHistory();
   const {
      data: boardinghouse,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/${bhId}`);
   const [isRoomPage, setIsRoomPage] = useState(false);

   const theme = useTheme();
   const [value, setValue] = useSessionStorage("admin-house-tab", 0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
      if (newValue === 1) {
         setIsRoomPage(true);
      } else {
         setIsRoomPage(false);
      }
   };

   useEffect(() => {
      if (value === 1) {
         setIsRoomPage(true);
      } else {
         setIsRoomPage(false);
      }
   }, [value]);

   const handleChangeIndex = (index) => {
      setValue(index);
      if (index === 1) {
         setIsRoomPage(true);
      } else {
         setIsRoomPage(false);
      }
   };

   const [message, setMessage] = useState("");
   const [showMessage, setShowMessage] = useState(false);
   const [messageSeverity, setMessageSeverity] = useState("warning");

   function NavigationTabs() {
      return (
         <Tabs
            sx={{
               borderBottom: "1px solid rgba(0,0,0,0.2)",
               "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: "1.5rem 1.5rem 0 0 ",
               },
            }}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="boardinghouse-tabs"
         >
            <Tooltip
               title="About Boarding House"
               TransitionComponent={Zoom}
               enterDelay={1000}
            >
               <Tab icon={<InfoIcon />} {...a11yProps(0)} />
            </Tooltip>
            <Tooltip title="Rooms" TransitionComponent={Zoom} enterDelay={1000}>
               <Tab icon={<BedroomChildIcon />} {...a11yProps(1)} />
            </Tooltip>
            <Tooltip
               title="Reviews"
               TransitionComponent={Zoom}
               enterDelay={1000}
            >
               <Tab icon={<ReviewsIcon />} {...a11yProps(2)} />
            </Tooltip>
         </Tabs>
      );
   }

   return (
      <Slide in={true} direction="left">
         <Container disableGutters maxWidth="xl">
            <Notification
               message={message}
               setShowMessage={setShowMessage}
               messageSeverity={messageSeverity}
               showMessage={showMessage}
            />
            {error && (
               <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 5, fontFamily: "Quicksand" }}
               >
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState />}
            {boardinghouse && (
               <>
                  <BackNavbar
                     title={boardinghouse.name}
                     subtitle="Boarding House"
                  >
                     {isRoomPage ? (
                        <Button
                           variant="contained"
                           color="success"
                           sx={{ mr: 1 }}
                           size="small"
                           onClick={() =>
                              history.push(
                                 `/admin/boarding-houses/${boardinghouse.id}/add-room`
                              )
                           }
                           startIcon={<AddOutlinedIcon />}
                        >
                           Add
                        </Button>
                     ) : (
                        <IconButton></IconButton>
                     )}
                  </BackNavbar>

                  <Box sx={{ background: "white" }}>
                     <NavigationTabs />
                  </Box>

                  <SwipeableViews
                     axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                     index={value}
                     onChangeIndex={handleChangeIndex}
                  >
                     <TabPanel value={value} index={0} dir={theme.direction}>
                        <About
                           boardinghouse={boardinghouse}
                           message={message}
                           showMessage={showMessage}
                           messageSeverity={messageSeverity}
                           setMessageSeverity={setMessageSeverity}
                           setMessage={setMessage}
                           setShowMessage={setShowMessage}
                        />
                     </TabPanel>
                     <TabPanel value={value} index={1} dir={theme.direction}>
                        <Box sx={{ minHeight: "100vh", paddingBottom: "5rem" }}>
                           <Rooms bhName={boardinghouse.name} />
                        </Box>
                     </TabPanel>

                     <TabPanel value={value} index={2} dir={theme.direction}>
                        <Reviews />
                     </TabPanel>
                  </SwipeableViews>
               </>
            )}
         </Container>
      </Slide>
   );
};

export default BoardingHouse;
