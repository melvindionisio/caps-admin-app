import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
//import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { Button, TextField, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CloseOutlined } from "@mui/icons-material";
import { Save } from "@mui/icons-material";
import { useState, useEffect } from "react";

const style = {
   position: "absolute",
   top: "40%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: 400,
   bgcolor: "background.paper",
   borderRadius: ".5rem",
   boxShadow: 10,
   p: 2,
   py: 2,
};

export default function ViewOwnerModal({
   open,
   handleClose,
   owner,
   isEdit,
   setIsEdit,
   isDelete,
   setIsDelete,
}) {
   const [ownerName, setOwnerName] = useState("");
   const [ownerUsername, setOwnerUsername] = useState("");
   const [deleteOwnerConfirm, setDeleteOwnerConfirm] = useState("");

   const handleDelete = () => {
      if (deleteOwnerConfirm === ownerName) {
         //delete owner with boardinghouse connected to the owner
         console.log("Owner Deleted");
      } else {
         console.log("not match");
      }
   };

   useEffect(() => {
      if (owner) {
         setOwnerName(owner.name);
         setOwnerUsername(owner.username);
      }
   }, [owner]);
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
               <Box sx={style}>
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
                                    textTransform: "uppercase",
                                    fontFamily: "Quicksand",
                                 }}
                              >
                                 Confirm Delete
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
                              margin="dense"
                              label="Enter Owner Name"
                              fullWidth
                              value={deleteOwnerConfirm}
                              onChange={(e) =>
                                 setDeleteOwnerConfirm(e.target.value)
                              }
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
                                 }}
                              >
                                 cancel
                              </Button>
                              <Button
                                 color="error"
                                 size="small"
                                 variant="contained"
                                 onClick={handleDelete}
                              >
                                 confirm delete
                              </Button>
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
                                    sx={{ mt: -1 }}
                                 >
                                    Owner Name
                                 </Typography>
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
                                          textTransform: "uppercase",
                                          fontFamily: "Quicksand",
                                       }}
                                    >
                                       Edit {ownerName}
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
                                    onChange={(e) =>
                                       setOwnerName(e.target.value)
                                    }
                                 />
                                 <TextField
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    label="Owner Username"
                                    value={ownerUsername}
                                    onChange={(e) =>
                                       setOwnerUsername(e.target.value)
                                    }
                                 />
                                 <Typography variant="caption">
                                    Reset Password
                                 </Typography>
                                 <TextField
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    label="New Password"
                                 />
                                 <TextField
                                    size="small"
                                    fullWidth
                                    margin="dense"
                                    label="Confirm Password"
                                 />
                              </>
                           )}
                           <Typography
                              id="transition-modal-description"
                              sx={{ mt: 2 }}
                           >
                              Duis mollis, est non commodo luctus, nisi erat
                              porttitor ligula. s
                           </Typography>
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
                                       onClick={() => setIsEdit(false)}
                                    >
                                       cancel
                                    </Button>
                                    <Button
                                       variant="contained"
                                       color="success"
                                       size="small"
                                       startIcon={<Save />}
                                    >
                                       save
                                    </Button>
                                 </>
                              )}
                           </Box>
                        </Box>
                     </>
                  )}
               </Box>
            </Fade>
         </Modal>
      </div>
   );
}
