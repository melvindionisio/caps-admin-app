import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@mui/material";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ByZone from "./pages/ByZone";
import Export from "./pages/Export";
import Profile from "./pages/Profile";
import AddBoardingHouse from "./pages/AddBoardingHouse";
import BoardingHouse from "./pages/BoardingHouse";
import Room from "./pages/Room";
import Owners from "./pages/Owners";
import AddRoom from "./pages/AddRoom";

import { LoginContext } from "./contexts/LoginContext";

const Routes = ({ handleDrawerToggle }) => {
   const { isAdminLoggedIn } = useContext(LoginContext);
   return (
      <Container disableGutters maxWidth="xl" sx={{ overflowY: "auto" }}>
         <Switch>
            <Route exact path="/">
               <Redirect to="/login" />
            </Route>
            <Route path="/login">
               {isAdminLoggedIn ? (
                  <Redirect to="/admin/dashboard" />
               ) : (
                  <Login />
               )}
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
               <AddBoardingHouse handleDrawerToggle={handleDrawerToggle} />
            </Route>
            <Route exact path="/admin/boarding-houses/:bhId/add-room">
               <AddRoom handleDrawerToggle={handleDrawerToggle} />
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
   );
};

export default Routes;
