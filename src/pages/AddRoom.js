import React, { useState } from "react";
import {
   Container,
   Box,
   Slide,
   Grid,
   TextField,
   Card,
   CardContent,
   IconButton,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";

import { domain } from "../fetch-url/fetchUrl";
import CustomInputPicture from "../components/CustomInputPicture";
import Notification from "../components/Notification";
import BackNavbar from "../components/BackNavbar";
import { useParams } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const useStyles = makeStyles({
   gridContainer: {
      padding: "1rem",
      paddingTop: "1.5rem",
   },
   scrollContainer: {
      marginBottom: "1rem",
   },
});

const AddRoom = () => {
   const classes = useStyles();
   const { bhId } = useParams();
   const [roomPicture, setRoomPicture] = useState(null);
   const [imagePreview, setImagePreview] = useState(null);
   const [imageName, setImageName] = useState();

   const [roomName, setRoomName] = useState("");
   const [roomDescription, setRoomDescription] = useState("");
   const [roomType, setRoomType] = useState("");
   const [genderAllowed, setGenderAllowed] = useState("Male/Female");
   const [totalSlots, setTotalSlots] = useState(0);
   const [occupiedSlots, setOccupiedSlots] = useState(0);

   const [message, setMessage] = useState("");
   const [showMessage, setShowMessage] = useState(false);
   const [messageSeverity, setMessageSeverity] = useState("warning");
   const [isSavePending, setSaveIsPending] = useState(false);

   const handleRoomSave = async (e) => {
      e.preventDefault();
      setSaveIsPending(true);

      const formData = new FormData();
      formData.append("room-image", roomPicture);

      fetch(`${domain}/api/rooms/upload`, {
         method: "POST",
         body: formData,
      })
         .then((res) => {
            return res.json();
         })
         .then((image) => {
            setImageName("Select Image");
            fetch(`${domain}/api/rooms/add/${bhId}`, {
               method: "POST",
               body: JSON.stringify({
                  roomName: roomName,
                  roomDescription: roomDescription,
                  roomType: roomType,
                  roomPicture: image.imagepath,
                  roomStatus: "Available",
                  genderAllowed: genderAllowed,
                  totalSlots: totalSlots,
                  occupiedSlots: occupiedSlots,
               }),
               headers: {
                  "Content-Type": "application/json",
               },
            })
               .then((res) => {
                  return res.json();
               })
               .then((data) => {
                  setMessage(data.message);
                  setShowMessage(true);
                  setMessageSeverity("success");

                  setRoomName("");
                  setRoomDescription("");
                  setRoomPicture(null);
                  setRoomType("");
                  setGenderAllowed("Male/Female");
                  setTotalSlots(0);
                  setOccupiedSlots(0);
                  setRoomPicture(null);

                  setImageName("");
                  setImagePreview(null);
                  setSaveIsPending(false);
               })
               .catch((err) => {
                  console.log(err);
                  setMessage(err);
                  setShowMessage(true);
                  setMessageSeverity("error");
               });
         })
         .catch((err) => {
            console.log(err);
            setMessage(err);
            setShowMessage(true);
            setMessageSeverity("error");
         });
   };

   const incrementTotal = () => {
      setTotalSlots(totalSlots + 1);
   };
   const decrementTotal = () => {
      setTotalSlots(totalSlots - 1);
   };
   const incrementOccupied = () => {
      if (occupiedSlots < totalSlots) {
         setOccupiedSlots(occupiedSlots + 1);
      }
   };
   const decrementOccupied = () => {
      setOccupiedSlots(occupiedSlots - 1);
   };

   return (
      <Slide in={true} direction="left">
         <Container disableGutters maxWidth="xl" sx={{ paddingBottom: 5 }}>
            <Notification
               message={message}
               showMessage={showMessage}
               setShowMessage={setShowMessage}
               messageSeverity={messageSeverity}
            />
            <form onSubmit={handleRoomSave}>
               <BackNavbar title="ADD ROOM">
                  <LoadingButton
                     variant="contained"
                     disableElevation
                     color="primary"
                     type="submit"
                     loading={isSavePending}
                     disabled={roomName ? false : true}
                     size="small"
                  >
                     Save
                  </LoadingButton>
               </BackNavbar>

               <Container
                  disableGutters
                  maxWidth="md"
                  sx={{ paddingBottom: 5 }}
               >
                  <Grid container spacing={2} className={classes.gridContainer}>
                     <Grid item lg={5} sm={6} xs={12}>
                        <CustomInputPicture
                           imagePreview={imagePreview}
                           setImagePreview={setImagePreview}
                           imageName={imageName}
                           setImageName={setImageName}
                           setRoomPicture={setRoomPicture}
                        />
                     </Grid>

                     <Grid item lg={7} sm={6} xs={12}>
                        <Card>
                           <CardContent>
                              <TextField
                                 label="Room Name"
                                 fullWidth
                                 size="small"
                                 variant="outlined"
                                 color="primary"
                                 value={roomName}
                                 autoFocus
                                 required
                                 margin="dense"
                                 sx={{ background: "#fff" }}
                                 onChange={(e) => setRoomName(e.target.value)}
                              />
                              <TextField
                                 label="Room Description"
                                 fullWidth
                                 size="small"
                                 rows={6}
                                 multiline
                                 variant="outlined"
                                 color="primary"
                                 value={roomDescription}
                                 margin="dense"
                                 sx={{ background: "#fff" }}
                                 onChange={(e) =>
                                    setRoomDescription(e.target.value)
                                 }
                              />
                              <Box
                                 sx={{
                                    display: "flex",
                                    gap: 1,
                                    marginTop: 1,
                                 }}
                              >
                                 <FormControl fullWidth size="small">
                                    <InputLabel id="room-type-label">
                                       Room Type
                                    </InputLabel>
                                    <Select
                                       labelId="room-type"
                                       id="room-type"
                                       value={roomType}
                                       label="Room Type"
                                       onChange={(e) =>
                                          setRoomType(e.target.value)
                                       }
                                    >
                                       <MenuItem value={"Studio"}>
                                          Studio Type
                                       </MenuItem>
                                       <MenuItem value={"6-person-room"}>
                                          6 Person-room
                                       </MenuItem>
                                       <MenuItem value={"4-person-room"}>
                                          4 Person-room
                                       </MenuItem>
                                       <MenuItem value={"2-person-room"}>
                                          2 Person-room
                                       </MenuItem>
                                       <MenuItem value={"single"}>
                                          Single
                                       </MenuItem>
                                    </Select>
                                 </FormControl>
                                 <FormControl fullWidth size="small">
                                    <InputLabel id="gender-cat-label">
                                       Gender Allowed
                                    </InputLabel>
                                    <Select
                                       labelId="gender-category"
                                       id="gender-cat"
                                       value={genderAllowed}
                                       label="Gender Category"
                                       onChange={(e) =>
                                          setGenderAllowed(e.target.value)
                                       }
                                    >
                                       <MenuItem value={"Male/Female"}>
                                          Male & Female
                                       </MenuItem>
                                       <MenuItem value={"Male"}>
                                          Male Only
                                       </MenuItem>
                                       <MenuItem value={"Female"}>
                                          Female Only
                                       </MenuItem>
                                    </Select>
                                 </FormControl>
                              </Box>
                              <Box
                                 sx={{
                                    display: "flex",
                                    gap: 1,
                                    my: 2,
                                 }}
                              >
                                 <Box
                                    sx={{
                                       display: "flex",
                                       flexGrow: 2,
                                    }}
                                 >
                                    <IconButton
                                       color="error"
                                       onClick={decrementTotal}
                                       disabled={totalSlots === 0}
                                    >
                                       <RemoveCircleIcon />
                                    </IconButton>
                                    <TextField
                                       variant="outlined"
                                       size="small"
                                       fullWidth
                                       label="Total Slots"
                                       type="number"
                                       value={totalSlots}
                                       onChange={(e) =>
                                          setTotalSlots(e.target.value)
                                       }
                                    />
                                    <IconButton
                                       onClick={incrementTotal}
                                       color="success"
                                    >
                                       <AddCircleIcon />
                                    </IconButton>
                                 </Box>

                                 <Box
                                    sx={{
                                       display: "flex",
                                       flexGrow: 2,
                                    }}
                                 >
                                    <IconButton
                                       onClick={decrementOccupied}
                                       color="error"
                                       disabled={occupiedSlots === 0}
                                    >
                                       <RemoveCircleIcon />
                                    </IconButton>
                                    <TextField
                                       variant="outlined"
                                       size="small"
                                       fullWidth
                                       type="number"
                                       label="Occupied Slots"
                                       value={occupiedSlots}
                                       onChange={(e) =>
                                          setOccupiedSlots(e.target.value)
                                       }
                                    />

                                    <IconButton
                                       onClick={incrementOccupied}
                                       color="success"
                                       disabled={occupiedSlots === totalSlots}
                                    >
                                       <AddCircleIcon />
                                    </IconButton>
                                 </Box>
                              </Box>
                           </CardContent>
                        </Card>
                     </Grid>
                  </Grid>
               </Container>
            </form>
         </Container>
      </Slide>
   );
};

export default AddRoom;
