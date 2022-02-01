import React from "react";
import BackNavbar from "../components/BackNavbar";
import useFetch from "../hooks/useFetch";
import { domain } from "../fetch-url/fetchUrl";
import { useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LoadingState from "../components/LoadingState";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Container from "@mui/material/Container";

function Room() {
   const { roomId } = useParams();
   const {
      data: room,
      isPending,
      error,
   } = useFetch(`${domain}/api/rooms/${roomId}`);

   return (
      <Slide in={true} direction="left">
         <Container disableGutters maxWidth="xl">
            {error && (
               <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 5, fontFamily: "Quicksand" }}
               >
                  {error}
               </Typography>
            )}
            {isPending && <LoadingState />}
            {room && (
               <>
                  <BackNavbar title={room.name} subtitle="Room">
                     <IconButton></IconButton>
                  </BackNavbar>
               </>
            )}
         </Container>
      </Slide>
   );
}

export default Room;
