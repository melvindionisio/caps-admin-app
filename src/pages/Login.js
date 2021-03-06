import { makeStyles } from "@mui/styles";
import {
   Container,
   Box,
   Typography,
   TextField,
   Card,
   CardActions,
   CardHeader,
   CardContent,
   Fade,
   Alert,
   IconButton,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import logo from "../sns-logo.png";
import { pink } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useState, useEffect } from "react";
import { domain } from "../fetch-url/fetchUrl";
import { LoginContext } from "../contexts/LoginContext";
//import loginBg from "../login-bg.png";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles({
   container: {
      height: "100vh",
      position: "relative",
   },
   formContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
   },
   textFields: {
      marginBottom: ".7rem",
   },
   sns_logo: {
      height: "5rem",
      width: "5rem",
   },
   cardActions: {
      padding: "0rem 1rem 1rem 1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   card: {
      padding: "1.5rem 0rem",
   },
   appname: {
      position: "relative",
      "&::after": {
         content: '"admin"',
         display: "block",
         fontSize: ".7rem",
         background: pink[400],
         position: "absolute",
         top: "0",
         right: "4rem",
         padding: "0rem .3rem",
         borderRadius: ".5rem",
         color: pink[50],
      },
   },
});

const Login = () => {
   const classes = useStyles();
   const history = useHistory();
   const [isLoginLoading, setIsLoginLoading] = useState(false);
   const [showMessage, setShowMessage] = useState(false);
   const [message, setMessage] = useState("");
   const [severity, setSeverity] = useState("warning");

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const { setIsAdminLoggedIn, setCurrentAdmin } = useContext(LoginContext);
   const [showPassword, setIsShowPassword] = useState(false);

   const handleClickShowPassword = () => {
      setIsShowPassword(!showPassword);
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   useEffect(() => {
      setTimeout(() => {
         if (showMessage) {
            setShowMessage(false);
         }
      }, 5000);
   }, [showMessage]);

   const handleLogin = (e) => {
      e.preventDefault();
      setIsLoginLoading(true);

      fetch(`${domain}/api/admin/auth`, {
         method: "POST",
         body: JSON.stringify({
            username: username,
            password: password,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            if (data.error === null) {
               //CONTEXT HERE

               setIsAdminLoggedIn(true);
               setCurrentAdmin({
                  id: data.admin_id,
                  name: data.admin_name,
                  username: data.admin_username,
               });

               console.log(data.message);
               history.push("/admin/dashboard");
               setIsLoginLoading(false);
            } else if (data.error === "incorrect") {
               setSeverity("warning");
               setMessage(data.message);
               setShowMessage(true);
               setIsLoginLoading(false);
            } else {
               setShowMessage(true);
               setSeverity("error");
               setMessage(data.message);
               setIsLoginLoading(false);
            }
         });
   };

   return (
      <Fade in={true}>
         <Box
            sx={{
               "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  //backgroundImage: `url(${loginBg})`,
                  opacity: "0.7",
                  filter: "blur(3px) brightness(0.6)",
               },
            }}
         >
            <Container
               maxWidth="sm"
               disableGutters
               className={classes.container}
            >
               <Box className={classes.formContainer} align="center">
                  <form onSubmit={handleLogin}>
                     <Card
                        variant="outlined"
                        className={classes.card}
                        sx={{ paddingBottom: 0 }}
                     >
                        <CardHeader
                           title={
                              <Box sx={{ textAlign: "center" }}>
                                 <img
                                    src={logo}
                                    id="logo"
                                    alt="logo"
                                    className={classes.sns_logo}
                                 />
                              </Box>
                           }
                           subheader={
                              <Typography
                                 variant="h5"
                                 color="textSecondary"
                                 component="h2"
                                 className={classes.appname}
                                 textAlign="center"
                              >
                                 SEARCH 'N STAY
                              </Typography>
                           }
                        />
                        <CardContent>
                           <TextField
                              label="Username"
                              fullWidth
                              variant="filled"
                              className={classes.textFields}
                              color="primary"
                              required
                              margin="normal"
                              autoFocus
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                           />
                           <Box sx={{ position: "relative" }}>
                              <TextField
                                 label="Password"
                                 fullWidth
                                 variant="filled"
                                 className={classes.textFields}
                                 color="primary"
                                 required
                                 type={showPassword ? "text" : "password"}
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                              />
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                                 sx={{
                                    position: "absolute",
                                    top: "50%",
                                    right: 3,
                                    mr: 0.5,
                                    transform: "translateY(-50%)",
                                 }}
                              >
                                 {showPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </Box>
                        </CardContent>
                        <CardActions className={classes.cardActions}>
                           <LoadingButton
                              variant="contained"
                              color="primary"
                              type="submit"
                              size="large"
                              fullWidth
                              loading={isLoginLoading}
                           >
                              Login as admin
                           </LoadingButton>
                        </CardActions>
                        {showMessage && (
                           <Alert severity={severity} sx={{ mt: 2 }}>
                              {message}
                           </Alert>
                        )}
                     </Card>
                  </form>
               </Box>
            </Container>
         </Box>
      </Fade>
   );
};

export default Login;
