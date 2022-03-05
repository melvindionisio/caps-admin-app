import {
   Container,
   IconButton,
   Card,
   CardHeader,
   CardContent,
   Button,
   Alert,
   TextField,
   Avatar,
   Chip,
   Box,
   Zoom,
} from "@mui/material";
import React from "react";
import HomeNavigation from "../components/HomeNavigation";
import { useState, useEffect, useContext } from "react";
import { EditOutlined } from "@mui/icons-material";
// import CancelIcon from "@mui/icons-material/Cancel";
import Logout from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";

import { LoginContext } from "../contexts/LoginContext";
import { domain } from "../fetch-url/fetchUrl";
import PasswordField from "../components/PasswordField";

const Profile = ({ handleDrawerToggle }) => {
   const { currentAdmin, setCurrentAdmin, handleAdminLogout } =
      useContext(LoginContext);
   const history = useHistory();

   const [name, setName] = useState(currentAdmin.name);
   const [userName, setUserName] = useState(currentAdmin.username);

   const [curPassword, setCurPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [rePassword, setRePassword] = useState("");

   const [profileEditable, setProfileEditable] = useState(false);
   const [isChangePassword, setIsChangePassword] = useState(false);
   const [passwordAlertMessage, setPasswordAlerMessage] = useState("");
   const [showPasswordAlert, setShowPasswordAlert] = useState(false);
   const [profileAlertMessage, setProfileAlertMessage] = useState("");
   const [showProfileAlert, setShowProfileAlert] = useState(false);

   const [severity, setSeverity] = useState("warning");

   useEffect(() => {
      setTimeout(() => {
         if (showPasswordAlert) {
            setShowPasswordAlert(false);
         }
         if (showProfileAlert) {
            setShowProfileAlert(false);
         }
      }, 5000);
   }, [showPasswordAlert, showProfileAlert]);

   // UPDATE PROFILE REQUEST - ✅ DONE!
   const updateProfile = () => {
      const adminId = currentAdmin.id;
      fetch(`${domain}/api/admin/update-profile/${adminId}`, {
         method: "PUT",
         body: JSON.stringify({
            newName: name,
            newUsername: userName,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            console.log(data);
            setCurrentAdmin({
               id: currentAdmin.id,
               name: name,
               username: userName,
               hash: currentAdmin.hash,
               token: currentAdmin.token,
            });
            setShowProfileAlert(true);
            setProfileAlertMessage(data.message);
            setProfileEditable(!profileEditable);
            setSeverity("success");
         });
   };

   // CHANGE PASSWORD REQUEST - ✅ DONE!
   const changePassword = () => {
      const passwordNotMatch = () => {
         setPasswordAlerMessage("New Password does not match!");
         setShowPasswordAlert(true);
         setSeverity("warning");
      };
      const blankFields = () => {
         setPasswordAlerMessage("Please fill all the fields!");
         setShowPasswordAlert(true);
         setSeverity("warning");
      };
      const incorrectCurrentPassword = () => {
         setPasswordAlerMessage("Current Password Incorrect!");
         setShowPasswordAlert(true);
         setSeverity("error");
      };

      const changePasswordPassed = () => {
         const adminId = currentAdmin.id;
         fetch(`${domain}/api/admin/update-password/${adminId}`, {
            method: "PUT",
            body: JSON.stringify({
               currentPassword: curPassword,
               newPassword: newPassword,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then((res) => {
               return res.json();
            })
            .then((data) => {
               if (data.err === null) {
                  setIsChangePassword(!isChangePassword);
                  setNewPassword("");
                  setCurPassword("");
                  setRePassword("");
                  setPasswordAlerMessage(data.message);
                  setShowPasswordAlert(true);
                  setSeverity("success");
               } else {
                  incorrectCurrentPassword();
               }
            });
      };

      if (curPassword && newPassword && rePassword !== "") {
         if (newPassword === rePassword) {
            if (newPassword.length >= 6 && rePassword.length >= 6) {
               changePasswordPassed();
            } else {
               setPasswordAlerMessage(
                  "Password should be at least 6 characters."
               );
               setShowPasswordAlert(true);
            }
         } else {
            passwordNotMatch();
         }
      } else {
         blankFields();
      }
   };

   const editProfile = () => {
      // if (profileEditable) {
      //   profile.current.firstElementChild.firstElementChild.focus();
      // }
      setProfileEditable(!profileEditable);
   };
   const editPassword = () => {
      setIsChangePassword(!isChangePassword);
      setNewPassword("");
      setCurPassword("");
      setRePassword("");
      setShowPasswordAlert(false);
   };

   return (
      <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
         <HomeNavigation
            title="profile"
            handleDrawerToggle={handleDrawerToggle}
         >
            <IconButton></IconButton>
         </HomeNavigation>
         <Zoom in={true}>
            <Container
               disableGutters
               maxWidth="sm"
               sx={{ p: 2, display: "flex" }}
            >
               <Card sx={{ width: "90%", p: 2, margin: "0 auto" }}>
                  <CardHeader
                     avatar={
                        <Avatar
                           sx={{ height: "4rem", width: "4rem" }}
                           aria-label="profile-pic"
                        ></Avatar>
                     }
                     action={
                        <IconButton
                           aria-label="edit-icon"
                           onClick={editProfile}
                        >
                           <EditOutlined />
                        </IconButton>
                     }
                     title={name}
                     subheader="Admin"
                  />
                  <CardContent>
                     <Chip size="small" label="PROFILE" sx={{ mb: 1 }} />
                     <Box sx={{ mb: 4 }}>
                        <TextField
                           id="name"
                           label="Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           fullWidth
                           size="small"
                           variant="outlined"
                           margin="dense"
                           disabled={!profileEditable}
                        />
                        <TextField
                           id="username"
                           label="Username"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}
                           fullWidth
                           size="small"
                           variant="outlined"
                           margin="dense"
                           disabled={!profileEditable}
                           sx={{ mb: 1 }}
                        />
                        <Alert
                           severity={severity}
                           sx={
                              showProfileAlert
                                 ? { display: "flex" }
                                 : { display: "none" }
                           }
                        >
                           {profileAlertMessage}
                        </Alert>
                        <Box
                           sx={
                              profileEditable
                                 ? {
                                      display: "flex",
                                      justifyContent: "flex-end",
                                   }
                                 : { display: "none" }
                           }
                        >
                           <Button
                              size="small"
                              variant="outlined"
                              disableElevation
                              color="secondary"
                              sx={{ mr: 1 }}
                              onClick={editProfile}
                           >
                              Cancel
                           </Button>
                           <Button
                              size="small"
                              variant="contained"
                              disableElevation
                              onClick={updateProfile}
                           >
                              save
                           </Button>
                        </Box>
                     </Box>

                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                           height: 13,
                           mb: 1,
                        }}
                     >
                        <Chip size="small" label="CHANGE PASSWORD" />

                        <IconButton
                           aria-label="edit-icon"
                           onClick={editPassword}
                        >
                           <EditOutlined />
                        </IconButton>
                     </Box>
                     <Box>
                        <PasswordField
                           password={curPassword}
                           setPassword={setCurPassword}
                           label="Current Password"
                           size="small"
                           disabled={!isChangePassword}
                        />
                        <TextField
                           id="new-password"
                           label="New Password"
                           type="password"
                           value={newPassword}
                           onChange={(e) => setNewPassword(e.target.value)}
                           fullWidth
                           size="small"
                           variant="outlined"
                           margin="dense"
                           disabled={!isChangePassword}
                           minlenght="6"
                           helperText="Password should be atleast 6 characters."
                        />
                        <TextField
                           id="re-password"
                           label="Repeat Password"
                           type="password"
                           value={rePassword}
                           onChange={(e) => setRePassword(e.target.value)}
                           fullWidth
                           size="small"
                           variant="outlined"
                           margin="dense"
                           disabled={!isChangePassword}
                           sx={{ mb: 1 }}
                           minlenght="6"
                        />

                        <Box
                           sx={
                              isChangePassword
                                 ? {
                                      display: "flex",
                                      justifyContent: "flex-end",
                                   }
                                 : { display: "none" }
                           }
                        >
                           <Button
                              size="small"
                              variant="outlined"
                              color="secondary"
                              disableElevation
                              onClick={editPassword}
                              sx={{ mr: 1 }}
                           >
                              Cancel
                           </Button>
                           <Button
                              size="small"
                              variant="contained"
                              disableElevation
                              onClick={changePassword}
                           >
                              change password
                           </Button>
                        </Box>
                     </Box>
                     <Alert
                        severity={severity}
                        sx={
                           showPasswordAlert
                              ? { display: "flex", mt: 2 }
                              : { display: "none", mt: 2 }
                        }
                     >
                        {passwordAlertMessage}
                     </Alert>
                  </CardContent>
                  <Button
                     variant="contained"
                     size="small"
                     fullWidth
                     color="secondary"
                     startIcon={<Logout />}
                     onClick={() => {
                        handleAdminLogout();
                        history.push("/");
                     }}
                  >
                     Logout
                  </Button>
               </Card>
            </Container>
         </Zoom>
      </Container>
   );
};

export default Profile;
