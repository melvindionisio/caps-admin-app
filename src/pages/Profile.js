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
import { useState, useRef, useEffect } from "react";
import { EditOutlined } from "@mui/icons-material";
// import CancelIcon from "@mui/icons-material/Cancel";
import HomeNavigation from "../components/HomeNavigation";

const Profile = ({ handleDrawerToggle }) => {
  const [name, setName] = useState("Melvin Dionisio");
  const [userName, setUserName] = useState("melsio021");
  const [password, setPassword] = useState("password");
  const [newPassword, setNewPassword] = useState("");
  const [curPassword, setCurPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [profileEditable, setProfileEditable] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const profile = useRef(null);
  const pass = useRef(null);
  const [severity, setSeverity] = useState("warning");

  useEffect(() => {
    setTimeout(() => {
      if (showAlert) {
        setShowAlert(false);
      }
    }, 5000);
  }, [showAlert]);

  // CHANGE NAME/USERNAME REQUEST
  const changeProfile = () => {
    let newProfile = {
      name: name,
      username: userName,
    };
    setProfileEditable(!profileEditable);
    console.log(newProfile);
  };

  const passwordNotMatch = () => {
    setAlertMessage("New Password does not match!");
    setShowAlert(true);
    setSeverity("warning");
  };
  const blankFields = () => {
    setAlertMessage("Please fill the field!");
    setShowAlert(true);
    setSeverity("warning");
  };
  const incorrectCurrentPassword = () => {
    setAlertMessage("Current Password Incorrect!");
    setShowAlert(true);
    setSeverity("warning");
  };
  const changePasswordSuccess = () => {
    let newPasswordRequest = {};
    newPasswordRequest = {
      currentPassword: curPassword,
      newPassword: newPassword,
      repeatNewPassword: rePassword,
    };

    console.log(newPasswordRequest);
    setIsChangePassword(!isChangePassword);
    setNewPassword("");
    setCurPassword("");
    setRePassword("");

    setAlertMessage("Password Changed!");
    setShowAlert(true);
    setSeverity("success");
  };

  // CHANGE PASSWORD REQUEST
  const changePassword = () => {
    if (curPassword && newPassword && rePassword !== "") {
      if (password === curPassword) {
        if (newPassword === rePassword) {
          changePasswordSuccess();
        } else {
          passwordNotMatch();
        }
      } else {
        incorrectCurrentPassword();
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
    // if (isChangePassword) {
    //   pass.current.firstElementChild.firstElementChild.focus();
    // }
    setIsChangePassword(!isChangePassword);
    setNewPassword("");
    setCurPassword("");
    setRePassword("");
    setShowAlert(false);
  };

  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
      <HomeNavigation title="profile" handleDrawerToggle={handleDrawerToggle} />
      <Zoom in={true}>
        <Container disableGutters maxWidth="sm" sx={{ p: 2, display: "flex" }}>
          <Card sx={{ width: "90%", p: 2, margin: "0 auto" }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ height: "4rem", width: "4rem" }}
                  aria-label="profile-pic"
                ></Avatar>
              }
              action={
                <IconButton aria-label="edit-icon" onClick={editProfile}>
                  <EditOutlined />
                </IconButton>
              }
              title="You are Login as: "
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
                  ref={profile}
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
                />
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  size="small"
                  variant="outlined"
                  margin="dense"
                  disabled
                  sx={{ mb: 1 }}
                />
                <Box
                  sx={
                    profileEditable
                      ? { display: "flex", justifyContent: "flex-end" }
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
                    onClick={changeProfile}
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
                <Chip size="small" label="PASSWORD" />

                <IconButton aria-label="edit-icon" onClick={editPassword}>
                  <EditOutlined />
                </IconButton>
              </Box>
              <Box>
                <TextField
                  ref={pass}
                  id="cur-password"
                  label="Current Password"
                  type="password"
                  value={curPassword}
                  onChange={(e) => setCurPassword(e.target.value)}
                  fullWidth
                  size="small"
                  variant="outlined"
                  margin="dense"
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
                />

                <Box
                  sx={
                    isChangePassword
                      ? { display: "flex", justifyContent: "flex-end" }
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
                  showAlert
                    ? { display: "flex", mt: 2 }
                    : { display: "none", mt: 2 }
                }
              >
                {alertMessage}
              </Alert>
            </CardContent>
          </Card>
        </Container>
      </Zoom>
    </Container>
  );
};

export default Profile;
