import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button, TextField, Divider, Alert, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CloseOutlined } from "@mui/icons-material";
import { Save } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { green, red } from "@mui/material/colors";
import { LoginContext } from "../contexts/LoginContext";
import { domain } from "../fetch-url/fetchUrl";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";

const style = {
   zIndex: 100,
   width: 400,
   bgcolor: "background.paper",
   borderRadius: ".5rem",
   boxShadow: 10,
   p: 2,
   py: 2,
   height: "max-content",
};

export default function ViewOwnerModal({
   open,
   handleClose,
   owner,
   isEdit,
   setIsEdit,
   isDelete,
   setIsDelete,
   deleteOwnerConfirm,
   setDeleteOwnerConfirm,
   newPassword,
   setNewPassword,
   repeatNewPassword,
   setRepeatNewPassword,
   profileChanged,
   setProfileChanged,
}) {
   const [ownerName, setOwnerName] = useState("");
   const [ownerUsername, setOwnerUsername] = useState("");
   const [ownedBoardinghouse, setOwnerBoardinghouse] = useState("");

   const [showMessage, setShowMessage] = useState(false);
   const [message, setMessage] = useState("");
   const [severity, setSeverity] = useState("warning");
   const [resetReady, setResetReady] = useState(false);

   const [isDeletePending, setIsDeletePending] = useState(false);
   const { currentAdmin, setCurrentAdmin } = useContext(LoginContext);
   const [isSaveProfilePending, setIsSaveProfilePending] = useState(false);
   const [ownerIsPending, setOwnerIsPending] = useState(true);

   const handleDelete = () => {
      if (deleteOwnerConfirm === ownerName) {
         setIsDeletePending(true);
         //delete owner with boardinghouse connected to the owner
         fetch(`${domain}/api/owners/delete/${owner.id}`, {
            method: "DELETE",
         })
            .then((res) => res.json())
            .then((data) => {
               console.log(data);
               setIsDeletePending(false);
               setShowMessage(true);
               setSeverity("success");
               setMessage(data.message);
               setTimeout(() => {
                  window.location.reload(false);
               }, 1000);
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         setShowMessage(true);
         setSeverity("warning");
         setMessage("Owner name incorrect.");
         console.log("not match");
      }
   };

   const handleUpdateProfile = () => {
      setIsSaveProfilePending(true);
      fetch(`${domain}/api/owners/update-profile/${owner.id}`, {
         method: "PUT",
         body: JSON.stringify({
            newName: ownerName,
            newUsername: ownerUsername,
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
               name: ownerName,
               username: ownerUsername,
            });
            setShowMessage(true);
            setMessage(data.message);
            setSeverity("success");
            setIsSaveProfilePending(false);
         });
   };
   const handleResetPassword = () => {
      if (newPassword && repeatNewPassword !== "") {
         if (newPassword !== repeatNewPassword) {
            setShowMessage(true);
            setSeverity("warning");
            setMessage("Password does not match!");
         } else {
            if (newPassword.length && repeatNewPassword.length <= 8) {
               setShowMessage(true);
               setSeverity("warning");
               setMessage("Password should be not less than 8 characters!");
            } else {
               //reset api here
               fetch(`${domain}/api/owners/update-password/${owner.id}`, {
                  method: "PUT",
                  body: JSON.stringify({
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
                     console.log(data);
                     setShowMessage(true);
                     setSeverity("success");
                     setMessage(data.message);
                     setNewPassword("");
                     setRepeatNewPassword("");
                  });
            }
         }
      } else {
         setShowMessage(true);
         setSeverity("warning");
         setMessage("The fields are empty");
      }
   };

   useEffect(() => {
      if (owner) {
         setOwnerName(owner.name);
         setOwnerUsername(owner.username);
         fetch(`${domain}/api/boarding-houses/by-owner/${owner.id}`)
            .then((res) => res.json())
            .then((data) => {
               setOwnerBoardinghouse(data);
               setOwnerIsPending(false);
            })
            .catch((err) => console.log(err));
      }
   }, [owner]);

   useEffect(() => {
      if (newPassword && repeatNewPassword) {
         setResetReady(true);
      }
   }, [newPassword, repeatNewPassword]);

   useEffect(() => {
      setTimeout(() => {
         if (showMessage) {
            setShowMessage(false);
         }
      }, 3000);
   }, [showMessage]);

   return (
      <div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={open}>
               <Container
                  maxWidth="xl"
                  disableGutters
                  sx={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     height: "100%",
                     mt: -7,
                     px: 2,
                  }}
               >
                  <Box sx={style}>
                     {ownerIsPending && <LoadingState />}
                     {owner && (
                        <>
                           <Box
                              sx={
                                 isDelete
                                    ? { display: "block" }
                                    : { display: "none" }
                              }
                           >
                              <Box
                                 sx={{
                                    position: "relative",
                                 }}
                              >
                                 <Typography
                                    variant="body1"
                                    align="center"
                                    sx={{
                                       mb: 1,
                                       fontFamily: "Quicksand",
                                    }}
                                 >
                                    Confirm Delete{" "}
                                    <Typography
                                       variant=" caption"
                                       sx={{ color: red[500] }}
                                    >
                                       {ownerName}
                                    </Typography>
                                 </Typography>
                                 <CloseOutlined
                                    sx={{
                                       position: "absolute",
                                       right: 0,
                                       top: 0,
                                    }}
                                    onClick={handleClose}
                                    color="warning"
                                 />
                              </Box>

                              <Divider />

                              <Typography
                                 variant="caption"
                                 sx={{
                                    mb: -1,
                                    display: "block",
                                    color: red[500],
                                 }}
                              >
                                 Delete an owner by typing the name and confirm.
                              </Typography>
                              <Typography variant="caption">
                                 Note: Deleting the owner also deletes the owned
                                 boarding house.
                              </Typography>
                              <TextField
                                 sx={{ mt: 2 }}
                                 size="small"
                                 margin="dense"
                                 label="Enter Owner Name"
                                 fullWidth
                                 autoFocus
                                 value={deleteOwnerConfirm}
                                 onChange={(e) => {
                                    setDeleteOwnerConfirm(e.target.value);
                                 }}
                              />

                              <Box
                                 sx={{
                                    mt: 1,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: 1,
                                 }}
                              >
                                 <Button
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                       setIsDelete(false);
                                       setDeleteOwnerConfirm("");
                                       setIsDeletePending(false);
                                    }}
                                 >
                                    cancel
                                 </Button>
                                 <LoadingButton
                                    color="error"
                                    size="small"
                                    variant="contained"
                                    onClick={handleDelete}
                                    loading={isDeletePending}
                                 >
                                    confirm delete
                                 </LoadingButton>
                              </Box>
                           </Box>
                           <Box
                              sx={
                                 isDelete
                                    ? {
                                         display: "none",
                                      }
                                    : {
                                         display: "block",
                                      }
                              }
                           >
                              {!isEdit ? (
                                 <div>
                                    <Box
                                       sx={{
                                          position: "relative",
                                       }}
                                    >
                                       <Typography
                                          variant="body1"
                                          align="center"
                                          sx={{
                                             mb: 1,
                                             textTransform: "uppercase",
                                             fontFamily: "Quicksand",
                                          }}
                                       >
                                          Owner
                                       </Typography>
                                       <CloseOutlined
                                          sx={{
                                             position: "absolute",
                                             right: 0,
                                             top: 0,
                                          }}
                                          onClick={handleClose}
                                       />
                                    </Box>
                                    <Divider sx={{ mb: 1 }} />
                                    <Typography
                                       id="transition-modal-title"
                                       variant="h6"
                                       sx={{
                                          fontFamily: "Quicksand",
                                          fontSize: 24,
                                       }}
                                    >
                                       {ownerName}
                                    </Typography>
                                    <Typography
                                       variant="subtitle1"
                                       sx={{ mt: -1, color: "text.secondary" }}
                                    >
                                       Owner Name
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                       {ownedBoardinghouse && (
                                          <>
                                             <Link
                                                to={`/admin/boarding-houses/${ownedBoardinghouse.id}`}
                                             >
                                                <Typography
                                                   sx={{ fontSize: 18 }}
                                                >
                                                   {ownedBoardinghouse.name}
                                                </Typography>
                                             </Link>
                                             <Typography
                                                variant="subtitle1"
                                                sx={{
                                                   mt: -1,
                                                   color: "text.secondary",
                                                   fontSize: 14,
                                                }}
                                             >
                                                Owned Boarding house
                                             </Typography>
                                             <Typography sx={{ fontSize: 18 }}>
                                                {
                                                   ownedBoardinghouse.completeAddress
                                                }
                                             </Typography>

                                             <Typography
                                                variant="subtitle1"
                                                sx={{
                                                   mt: -1,
                                                   color: "text.secondary",
                                                   fontSize: 14,
                                                }}
                                             >
                                                Address
                                             </Typography>
                                             <Typography sx={{ fontSize: 18 }}>
                                                {ownedBoardinghouse.contacts}
                                             </Typography>
                                             <Typography
                                                variant="subtitle1"
                                                sx={{
                                                   mt: -1,
                                                   color: "text.secondary",
                                                   fontSize: 14,
                                                }}
                                             >
                                                Contact No
                                             </Typography>
                                          </>
                                       )}
                                    </Box>
                                 </div>
                              ) : (
                                 <>
                                    <Box
                                       sx={{
                                          position: "relative",
                                       }}
                                    >
                                       <Typography
                                          variant="body1"
                                          align="center"
                                          sx={{
                                             mb: 1,
                                             fontFamily: "Quicksand",
                                          }}
                                       >
                                          Edit{" "}
                                          <Typography
                                             variant=" caption"
                                             sx={{ color: green[500] }}
                                          >
                                             {ownerName}
                                          </Typography>
                                       </Typography>
                                       <CloseOutlined
                                          sx={{
                                             position: "absolute",
                                             right: 0,
                                             top: 0,
                                          }}
                                          onClick={handleClose}
                                       />
                                    </Box>
                                    <Divider sx={{ mb: 1 }} />
                                    <TextField
                                       size="small"
                                       fullWidth
                                       label="Owner Name"
                                       margin="dense"
                                       value={ownerName}
                                       autoFocus
                                       onChange={(e) => {
                                          setOwnerName(e.target.value);
                                          setProfileChanged(true);
                                       }}
                                    />
                                    <TextField
                                       size="small"
                                       fullWidth
                                       margin="dense"
                                       label="Owner Username"
                                       value={ownerUsername}
                                       onChange={(e) => {
                                          setOwnerUsername(e.target.value);
                                          setProfileChanged(true);
                                       }}
                                    />
                                    <Box
                                       sx={{
                                          mt: 1,
                                          display: "flex",
                                          justifyContent: "flex-end",
                                       }}
                                    >
                                       <LoadingButton
                                          variant="contained"
                                          color="success"
                                          size="small"
                                          startIcon={<Save />}
                                          onClick={handleUpdateProfile}
                                          disabled={!profileChanged}
                                          loading={isSaveProfilePending}
                                       >
                                          Save Profile
                                       </LoadingButton>
                                    </Box>

                                    <Typography variant="caption">
                                       Reset Password
                                    </Typography>
                                    <TextField
                                       size="small"
                                       fullWidth
                                       margin="dense"
                                       label="New Password"
                                       type="password"
                                       value={newPassword}
                                       onChange={(e) =>
                                          setNewPassword(e.target.value)
                                       }
                                    />
                                    <TextField
                                       size="small"
                                       fullWidth
                                       margin="dense"
                                       label="Confirm Password"
                                       type="password"
                                       value={repeatNewPassword}
                                       onChange={(e) =>
                                          setRepeatNewPassword(e.target.value)
                                       }
                                    />
                                 </>
                              )}
                              <Box
                                 sx={{
                                    gap: 1,
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                 }}
                              >
                                 {!isEdit ? (
                                    <>
                                       <Button
                                          color="primary"
                                          variant="contained"
                                          size="small"
                                          startIcon={<EditIcon />}
                                          onClick={() => setIsEdit(true)}
                                       >
                                          Edit
                                       </Button>
                                       <Button
                                          variant="contained"
                                          color="error"
                                          size="small"
                                          startIcon={<DeleteIcon />}
                                          onClick={() => setIsDelete(true)}
                                       >
                                          delete
                                       </Button>
                                    </>
                                 ) : (
                                    <>
                                       <Button
                                          color="error"
                                          variant="contained"
                                          size="small"
                                          onClick={() => {
                                             setNewPassword("");
                                             setRepeatNewPassword("");
                                             setIsEdit(false);
                                          }}
                                       >
                                          cancel
                                       </Button>
                                       <Button
                                          color="warning"
                                          variant="contained"
                                          size="small"
                                          onClick={handleResetPassword}
                                          disabled={!resetReady}
                                       >
                                          reset password
                                       </Button>
                                    </>
                                 )}
                              </Box>
                           </Box>
                        </>
                     )}
                     {showMessage && (
                        <Alert severity={severity} sx={{ mt: 2 }}>
                           {message}
                        </Alert>
                     )}
                  </Box>
               </Container>
            </Fade>
         </Modal>
      </div>
   );
}
