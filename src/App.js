import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";
import { createTheme, ThemeProvider, Container, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, pink, grey } from "@mui/material/colors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Export from "./pages/Export";
import Profile from "./pages/Profile";
import AddBoardingHouse from "./pages/AddBoardingHouse";
import BoardingHouse from "./pages/BoardingHouse";
import Room from "./pages/Room";
import Owners from "./pages/Owners";

import { useState } from "react";
import Menu from "./components/Menu";
import ByZone from "./pages/ByZone";
import LoginContextProvider from "./contexts/LoginContext";

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
                  <Container
                     disableGutters
                     maxWidth="xl"
                     sx={{ overflowY: "auto" }}
                  >
                     <Switch>
                        <Route exact path="/">
                           <Redirect to="/login" />
                        </Route>
                        <Route path="/login">
                           <Login />
                        </Route>
                        <Route exact path="/admin/boarding-houses">
                           <Home handleDrawerToggle={handleDrawerToggle} />
                        </Route>
                        <Route path="/admin/dashboard">
                           <Dashboard handleDrawerToggle={handleDrawerToggle} />
                        </Route>
                        <Route path="/admin/owners">
                           <Owners handleDrawerToggle={handleDrawerToggle} />
                        </Route>
                        <Route path="/admin/dashboard/:zone">
                           <ByZone />
                        </Route>
                        <Route exact path="/admin/boarding-houses/add">
                           <AddBoardingHouse
                              handleDrawerToggle={handleDrawerToggle}
                           />
                        </Route>
                        <Route path="/admin/boarding-houses/:bhId">
                           <BoardingHouse />
                        </Route>
                        <Route exact path="/admin/rooms/:roomId">
                           <Room />
                        </Route>
                        <Route path="/admin/export">
                           <Export handleDrawerToggle={handleDrawerToggle} />
                        </Route>
                        <Route path="/admin/profile">
                           <Profile handleDrawerToggle={handleDrawerToggle} />
                        </Route>
                     </Switch>
                  </Container>
               </Router>
            </Container>
         </LoginContextProvider>
      </ThemeProvider>
   );
};

export default App;
