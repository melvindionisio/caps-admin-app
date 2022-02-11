import React, { useState } from "react";
import HomeNavigation from "../components/HomeNavigation";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { domain } from "../fetch-url/fetchUrl";
import LoadingState from "../components/LoadingState";
import OwnerCard from "../components/cards/OwnerCard";
import ViewOwnerModal from "../components/ViewOwnerModal";

function Owners({ handleDrawerToggle }) {
   const { data: owners, isPending, error } = useFetch(`${domain}/api/owners`);

   const [open, setOpen] = useState(false);
   const [owner, setOwner] = useState();
   const [isEdit, setIsEdit] = useState(false);
   const [isDelete, setIsDelete] = useState(false);

   const [deleteOwnerConfirm, setDeleteOwnerConfirm] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [repeatNewPassword, setRepeatNewPassword] = useState("");
   const [profileChanged, setProfileChanged] = useState(false);

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
      setIsEdit(false);
      setIsDelete(false);
      setDeleteOwnerConfirm("");
      setNewPassword("");
      setRepeatNewPassword("");
      setProfileChanged(false);
   };

   return (
      <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
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
         />
         <HomeNavigation
            title="Owners"
            handleDrawerToggle={handleDrawerToggle}
         />
         <Container
            maxWidth="md"
            sx={{
               p: 2,
               pt: 5,
               pb: 5,
               display: "flex",
               gap: 1,
               flexDirection: "column",
            }}
            disableGutters
         >
            {error && <Typography variant="body1">{error}</Typography>}
            {isPending && <LoadingState />}
            {owners &&
               owners.map((owner) => (
                  <OwnerCard
                     handleOpen={() => handleOpen(owner)}
                     owner={owner}
                  />
               ))}
         </Container>
      </Container>
   );
}

export default Owners;
