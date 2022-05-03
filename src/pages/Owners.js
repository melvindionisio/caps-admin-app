import React, { useEffect, useState } from "react";
import HomeNavigation from "../components/HomeNavigation";
import Container from "@mui/material/Container";
import { Box, Typography, IconButton } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { domain } from "../fetch-url/fetchUrl";
import LoadingState from "../components/LoadingState";
import OwnerCard from "../components/cards/OwnerCard";
import ViewOwnerModal from "../components/ViewOwnerModal";
import { AddCircle } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import Notification from "../components/Notification";

function Owners({ handleDrawerToggle }) {
   const history = useHistory();
   const { data: owners, isPending, error } = useFetch(`${domain}/api/owners`);

   const [open, setOpen] = useState(false);
   const [owner, setOwner] = useState();
   const [ownedBoardinghouse, setOwnerBoardinghouse] = useState("");

   const [isEdit, setIsEdit] = useState(false);
   const [isDelete, setIsDelete] = useState(false);
   const [isEmpty, setIsEmpty] = useState(false);

   const [deleteOwnerConfirm, setDeleteOwnerConfirm] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [repeatNewPassword, setRepeatNewPassword] = useState("");
   const [profileChanged, setProfileChanged] = useState(false);

   useEffect(() => {
      if (owners) {
         if (owners.length <= 0) {
            setIsEmpty(true);
         }
      }
   }, [owners]);

   const handleOpen = (owner) => {
      setOpen(true);
      fetch(`${domain}/api/owners/${owner.id}`)
         .then((res) => res.json())
         .then((data) => {
            setOwner(data);
         })
         .catch((err) => console.log(err));
   };

   const handleClose = () => {
      setOpen(false);
      setOwner(null);
      setOwnerBoardinghouse(null);
      setIsEdit(false);
      setIsDelete(false);
      setDeleteOwnerConfirm("");
      setNewPassword("");
      setRepeatNewPassword("");
      setProfileChanged(false);
   };

   const [showMessage, setShowMessage] = useState(false);
   const [message, setMessage] = useState("");
   const [severity, setSeverity] = useState("warning");

   return (
      <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
         {!isEmpty && (
            <IconButton
               onClick={() => history.push("/admin/boarding-houses/add")}
               size="large"
               color="warning"
               sx={{ position: "absolute", bottom: 10, right: 10, zIndex: 100 }}
            >
               <AddCircle sx={{ height: "2.5rem", width: "2.5rem" }} />
            </IconButton>
         )}
         <Notification
            message={message}
            setShowMessage={setShowMessage}
            severity={severity}
            showMessage={showMessage}
         />
         <ViewOwnerModal
            open={open}
            handleClose={handleClose}
            owner={owner}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
            deleteOwnerConfirm={deleteOwnerConfirm}
            setDeleteOwnerConfirm={setDeleteOwnerConfirm}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            repeatNewPassword={repeatNewPassword}
            setRepeatNewPassword={setRepeatNewPassword}
            profileChanged={profileChanged}
            setProfileChanged={setProfileChanged}
            setMessage={setMessage}
            setShowMessage={setShowMessage}
            setSeverity={setSeverity}
            showMessage={showMessage}
            severity={severity}
            message={message}
            ownedBoardinghouse={ownedBoardinghouse}
            setOwnerBoardinghouse={setOwnerBoardinghouse}
         />
         <HomeNavigation
            title="Owners"
            handleDrawerToggle={handleDrawerToggle}
         />
         <Container
            maxWidth="sm"
            sx={{
               p: 2,
               pt: 5,
               pb: 5,
               display: "flex",
               gap: 1,
               flexDirection: "column",
               overflowY: "auto",
            }}
            disableGutters
         >
            {isEmpty && (
               <Box
                  sx={{
                     display: " flex",
                     flexDirection: "column",
                     alignItems: "center",
                  }}
               >
                  <Typography
                     variant="body2"
                     color="text.secondary"
                     align="center"
                     sx={{ mt: 4 }}
                  >
                     No available owners yet.
                  </Typography>

                  <IconButton
                     onClick={() => history.push("/admin/boarding-houses/add")}
                     size="large"
                  >
                     <AddCircle sx={{ height: "2.5rem", width: "2.5rem" }} />
                  </IconButton>
               </Box>
            )}

            {error && <Typography variant="body1">{error}</Typography>}
            {isPending && <LoadingState />}
            {owners &&
               owners.map((owner) => (
                  <OwnerCard
                     handleOpen={() => handleOpen(owner)}
                     owner={owner}
                     key={owner.id}
                  />
               ))}
         </Container>
      </Container>
   );
}

export default Owners;
