import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider, Container, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, pink, grey } from "@mui/material/colors";

import { useState } from "react";
import Menu from "./components/Menu";
import LoginContextProvider from "./contexts/LoginContext";
import Routes from "./Routes";
import Sidebar from "./components/Sidebar";

const useStyles = makeStyles((theme) => ({
   mainContainer: {
      overflow: "hidden",
      height: "100vh",
      display: "flex",
      background: grey[200],
      position: "relative",
   },
}));

const theme = createTheme({
   palette: {
      // mode: "dark",
      primary: {
         main: blue[500],
      },
      secondary: {
         main: pink[600],
      },
   },
   typography: {
      // fontFamily: "PT Sans",
      // fontWeightRegular: 400,
      // fontWeightBold: 700,

      // fontFamily: "Quicksand",
      // fontWeightLight: 400,
      // fontWeightRegular: 500,
      // fontWeightMedium: 600,
      // fontWeightBold: 700,

      fontFamily: "Source Sans Pro",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
   },
   spacing: 8,
});

const App = () => {
   const classes = useStyles();

   const [menuOpen, setMenuOpen] = useState(false);
   const handleDrawerToggle = () => {
      setMenuOpen(!menuOpen);
   };

   return (
      <ThemeProvider theme={theme}>
         <LoginContextProvider>
            <Container
               disableGutters
               maxWidth="xl"
               sx={{ display: "flex" }}
               className={classes.mainContainer}
            >
               <Router>
                  <Menu
                     handleDrawerToggle={handleDrawerToggle}
                     menuOpen={menuOpen}
                     anchor="left"
                  />
                  <Hidden mdDown>
                     <Sidebar />
                  </Hidden>
                  <Routes handleDrawerToggle={handleDrawerToggle} />
               </Router>
            </Container>
         </LoginContextProvider>
      </ThemeProvider>
   );
};

export default App;
