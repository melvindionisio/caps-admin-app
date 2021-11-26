import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createTheme, ThemeProvider, Container, Hidden } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blue, orange, grey } from "@mui/material/colors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Export from "./pages/Export";
import Profile from "./pages/Profile";

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
      main: blue[700],
    },
    secondary: {
      main: orange[700],
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
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{ display: "flex" }}
        className={classes.mainContainer}
      >
        <Router>
          <Hidden smDown>
            <Sidebar />
          </Hidden>
          <Container disableGutters maxWidth="xl" sx={{ overflowY: "auto" }}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/admin/boarding-house">
                <Home />
              </Route>
              <Route path="/admin/dashboard">
                <Dashboard />
              </Route>
              <Route path="/admin/export">
                <Export />
              </Route>
              <Route path="/admin/profile">
                <Profile />
              </Route>
            </Switch>
          </Container>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

export default App;
