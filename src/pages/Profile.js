import React from "react";
import HomeNavigation from "../components/HomeNavigation";
import {
  Container,
  Box,
  Chip,
  CardHeader,
  Avatar,
  Card,
  IconButton,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import { CardContent } from "@material-ui/core";
// import { blue, grey } from "@material-ui/core/colors";

const Profile = () => {
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

  // CHANGE NAME/USERNAME REQUEST
  // const changeUserName = () => {
  //   let profile = {
  //     name: name,
  //     username: userName,
  //   };
  // };

  // CHANGE PASSWORD REQUEST
  const changePassword = () => {
    // let changePasswordContent = {};
    if (curPassword && newPassword && rePassword !== "") {
      if (password === curPassword) {
        // changePasswordContent = {
        //   currentPassword: curPassword,
        //   newPassword: newPassword,
        //   repeatNewPassword: rePassword,
        // };
        setIsChangePassword(!isChangePassword);
        setNewPassword("");
        setCurPassword("");
        setRePassword("");
      } else {
        setAlertMessage("Current Password Incorrect!");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Please fill the field!");
      setShowAlert(true);
    }
  };

  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
      <HomeNavigation title="profile" />
      <Container maxWidth="sm" sx={{ p: 2, display: "flex" }}>
        <Card sx={{ width: "90%", p: 2, margin: "0 auto" }}>
          <CardHeader
            avatar={<Avatar aria-label="profile-pic"></Avatar>}
            action={
              !profileEditable ? (
                <IconButton
                  aria-label="edit-icon"
                  onClick={() => setProfileEditable(!profileEditable)}
                >
                  <EditOutlined />
                </IconButton>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  onClick={() => setProfileEditable(!profileEditable)}
                >
                  save
                </Button>
              )
            }
            title="You are Login as: "
            subheader="Admin"
          />
          <CardContent>
            <Chip size="small" label="PROFILE" />

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
              sx={{ mb: 3 }}
            />

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
              {!isChangePassword ? (
                <IconButton
                  aria-label="edit-icon"
                  onClick={() => setIsChangePassword(!isChangePassword)}
                >
                  <EditOutlined />
                </IconButton>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  onClick={changePassword}
                >
                  change password
                </Button>
              )}
            </Box>
            <Box>
              <TextField
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
                id="password"
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
              />
            </Box>
            <Alert
              severity="error"
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
    </Container>
  );
};

export default Profile;
