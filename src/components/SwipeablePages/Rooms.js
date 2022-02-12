import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useFetch from "../../hooks/useFetch";
import { useParams, Link } from "react-router-dom";
import LoadingState from "../../components/LoadingState";
//import Masonry from "@mui/lab/Masonry";
//import SimpleRoomCard from "../../components/cards/SimpleRoomCard";
import { domain } from "../../fetch-url/fetchUrl";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";

const Rooms = ({ bhName }) => {
   const { bhId } = useParams();
   const {
      data: rooms,
      isPending,
      error,
   } = useFetch(`${domain}/api/rooms/all/${bhId}`);

   return (
      <Container
         maxWidth="md"
         disableGutters
         sx={{
            padding: 2,
            paddingBottom: "5rem",
            height: "85vh",
            overflowY: "auto",
         }}
      >
         <Grid container spacing={1}>
            {error && (
               <Typography variant="caption" align="center">
                  Error. {error}
               </Typography>
            )}
            {isPending && <LoadingState loadWhat="rooms" />}

            {/*<Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 2 }} spacing={2}>*/}
            {rooms &&
               rooms.map((room) => (
                  //<SimpleRoomCard key={room.id} room={room} />
                  <Grid item xs={12} md={6} key={room.id}>
                     <Link
                        to={`/admin/rooms/${room.id}`}
                        style={{ textDecoration: "none " }}
                     >
                        <Card
                           key={room.id}
                           sx={{ borderRadius: 2 }}
                           variant="outlined"
                        >
                           <CardActionArea>
                              <CardHeader
                                 title={
                                    <Typography
                                       variant="body1"
                                       sx={{
                                          fontSize: 16,
                                       }}
                                    >
                                       {room.name.toUpperCase()}
                                    </Typography>
                                 }
                                 subheader={
                                    <Typography
                                       variant="subtitle1 "
                                       color="text.secondary"
                                       sx={{ fontSize: 12 }}
                                    >
                                       {room.status}
                                    </Typography>
                                 }
                              />
                           </CardActionArea>
                        </Card>
                     </Link>
                  </Grid>
               ))}
            {/*</Masonry>*/}
         </Grid>
      </Container>
   );
};

export default Rooms;
