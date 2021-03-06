import React from "react";
import { useState, useEffect } from "react";
import {
   Button,
   TextField,
   Card,
   Fade,
   CardContent,
   Box,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Container,
   Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { EditOutlined } from "@mui/icons-material";

import { domain } from "../../fetch-url/fetchUrl";

function About({
   boardinghouse,
   message,
   setMessage,
   showMessage,
   setShowMessage,
   messageSeverity,
   setMessageSeverity,
}) {
   const [isBoardinghouseEditable, setIsBoardinghouseEditable] = useState(true);

   const [name, setName] = useState("");
   const [owner, setOwner] = useState("");
   const [completeAddress, setCompleteAddress] = useState("");
   const [contact, setContact] = useState(0);
   const [email, setEmail] = useState("");
   const [zoneAddress, setZoneAddress] = useState("");
   const [streetAddress, setStreetAddress] = useState("");
   const [tagline, setTagline] = useState("");
   const [longitude, setLongitude] = useState(0);
   const [latitude, setLatitude] = useState(0);
   const [offers, setOffers] = useState("");
   const [houseProtocols, setHouseProtocols] = useState("");
   const [waterSource, setWaterSource] = useState("");
   const [gendersAllowed, setGendersAllowed] = useState("Male/Female");
   const [priceRange, setPriceRange] = useState("P 400-500");

   const [isSavePending, setIsSavePending] = useState(false);

   useEffect(() => {
      if (boardinghouse) {
         setName(boardinghouse.name);
         setOwner(boardinghouse.owner);
         setCompleteAddress(boardinghouse.completeAddress);
         setContact(boardinghouse.contacts);
         setEmail(boardinghouse.email ?? "");
         setZoneAddress(boardinghouse.zoneAddress);
         setStreetAddress(boardinghouse.streetAddress);
         setLongitude(boardinghouse.longitude);
         setLatitude(boardinghouse.latitude);
         setOffers(boardinghouse.offers ?? "Not Available");
         setTagline(boardinghouse.tagline ?? "Not Available");
         setHouseProtocols(boardinghouse.houseProtocols ?? "Not Available");
         setWaterSource(boardinghouse.waterSource ?? "Not Available");
         setGendersAllowed(boardinghouse.genderAllowed ?? "Male/Female");
         setPriceRange(boardinghouse.priceRange ?? "P 400-500");
      }
   }, [boardinghouse]);

   useEffect(() => {
      setCompleteAddress(`${streetAddress} - ${zoneAddress}, UEP`);
   }, [zoneAddress, streetAddress]);

   const handleUpdateBoardinghouse = () => {
      setIsSavePending(true);
      fetch(`${domain}/api/boarding-houses/update/${boardinghouse.id}`, {
         method: "PUT",
         body: JSON.stringify({
            name: name,
            owner: owner,
            completeAddress: completeAddress,
            contact: contact,
            email: email,
            zoneAddress: zoneAddress,
            streetAddress: streetAddress,
            longitude: longitude,
            latitude: latitude,
            offers: offers,
            tagline: tagline,
            waterSource: waterSource,
            houseProtocols: houseProtocols,
            gendersAllowed: gendersAllowed,
            priceRange: priceRange,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data) => {
            setIsSavePending(false);
            setTimeout(() => {}, 1500);

            setMessage(data.message);
            setMessageSeverity("success");
            setShowMessage(true);
            console.log("Boardinghouse updated");
            setIsBoardinghouseEditable(true);
         })
         .catch((err) => console.log(err));
   };

   return (
      <>
         <Fade in={true}>
            <Container maxWidth="sm">
               <Box
                  sx={{
                     gap: 1,
                     pt: 3,
                     display: "flex",
                     justifyContent: "flex-end",
                  }}
               >
                  {!isBoardinghouseEditable ? (
                     <>
                        <Button
                           id="cancel-update-button"
                           variant="contained"
                           color="secondary"
                           size="small"
                           disableElevation
                           onClick={() => setIsBoardinghouseEditable(true)}
                        >
                           Cancel
                        </Button>
                        <LoadingButton
                           id="save-update-button"
                           variant="contained"
                           size="small"
                           loading={isSavePending}
                           loadingIndicator="SAVING..."
                           disableElevation
                           onClick={handleUpdateBoardinghouse}
                        >
                           Save
                        </LoadingButton>
                     </>
                  ) : (
                     <Button
                        id="edit-update-button"
                        variant="contained"
                        color="secondary"
                        size="small"
                        disableElevation
                        startIcon={<EditOutlined />}
                        onClick={() => setIsBoardinghouseEditable(false)}
                     >
                        Edit
                     </Button>
                  )}
               </Box>
               <Card sx={{ my: 5, mt: 2 }}>
                  <CardContent sx={{ paddingBottom: 0 }}>
                     <TextField
                        id="bh-name"
                        label="Boarding House Name"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        disabled={isBoardinghouseEditable}
                     />
                     <TextField
                        id="bh-owner"
                        label="Owner Name"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={owner}
                        disabled
                        onChange={(e) => setOwner(e.target.value)}
                     />
                     <TextField
                        id="bh-contacts"
                        label="Contact Number"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        type="number"
                        fullWidth
                        helperText="Ex. 09166809369"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        disabled={isBoardinghouseEditable}
                     />
                     <TextField
                        id="bh-email"
                        label="Email Address"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        type="email"
                        fullWidth
                        helperText="Ex. owneremail@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isBoardinghouseEditable}
                     />
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           gap: 1,
                           py: 1,
                        }}
                     >
                        <FormControl sx={{ width: 200, mt: ".3rem" }}>
                           <InputLabel size="small" id="gender-allowed-label">
                              Gender Allowed
                           </InputLabel>
                           <Select
                              labelId="gender-label"
                              id="gender-allowed-select"
                              value={gendersAllowed}
                              size="small"
                              label="Gender Allowed"
                              onChange={(e) => {
                                 setGendersAllowed(e.target.value);
                              }}
                              disabled={isBoardinghouseEditable}
                           >
                              <MenuItem value={"Male/Female"}>
                                 Male & Female
                              </MenuItem>
                              <MenuItem value={"Female"}>Female</MenuItem>
                              <MenuItem value={"Male"}>Male</MenuItem>
                           </Select>
                        </FormControl>
                        <FormControl sx={{ width: 200, mt: ".3rem" }}>
                           <InputLabel size="small" id="price-range-label">
                              Price Range
                           </InputLabel>
                           <Select
                              labelId="price-range-select-label"
                              id="price-range"
                              value={priceRange}
                              size="small"
                              label="Price Range"
                              onChange={(e) => {
                                 setPriceRange(e.target.value);
                              }}
                              disabled={isBoardinghouseEditable}
                           >
                              <MenuItem value="P 400-500">400-500</MenuItem>
                              <MenuItem value="P 500-600">500-600</MenuItem>
                              <MenuItem value="P 600-700">600-700</MenuItem>
                              <MenuItem value="P 700-800">700-800</MenuItem>
                              <MenuItem value="P 800-900">800-900</MenuItem>
                              <MenuItem value="P 900-1000">900-1000</MenuItem>
                              <MenuItem value="P 1000+">1000+</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>
                     <Typography variant="body1">Location</Typography>
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           gap: 2,
                           pt: 1,
                        }}
                     >
                        <TextField
                           id="st-add"
                           label="Street Address"
                           variant="outlined"
                           color="primary"
                           margin="dense"
                           size="small"
                           fullWidth
                           // helperText="e.g. Seaside Drv."
                           value={streetAddress}
                           onChange={(e) => {
                              setStreetAddress(e.target.value);
                           }}
                           disabled={isBoardinghouseEditable}
                        />
                        <FormControl sx={{ width: 200, mt: ".3rem" }}>
                           <InputLabel size="small" id="zone-address">
                              Zone Address
                           </InputLabel>
                           <Select
                              labelId="zone-address-label"
                              id="zone-address-select"
                              value={zoneAddress}
                              size="small"
                              label="Zone Address"
                              onChange={(e) => {
                                 setZoneAddress(e.target.value);
                              }}
                              disabled={isBoardinghouseEditable}
                           >
                              <MenuItem value={"Zone 1"}>Zone 1, UEP</MenuItem>
                              <MenuItem value={"Zone 2"}>Zone 2, UEP</MenuItem>
                              <MenuItem value={"Zone 3"}>Zone 3, UEP</MenuItem>
                           </Select>
                        </FormControl>
                     </Box>
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           gap: 2,
                           py: 1,
                        }}
                     >
                        <TextField
                           id="longitude"
                           label="Longitude"
                           value={longitude}
                           type="number"
                           size="small"
                           onChange={(e) => setLongitude(e.target.value)}
                           disabled={isBoardinghouseEditable}
                        />
                        <TextField
                           id="latitude"
                           label="Latitude"
                           value={latitude}
                           size="small"
                           type="number"
                           onChange={(e) => setLatitude(e.target.value)}
                           disabled={isBoardinghouseEditable}
                        />
                     </Box>
                     <TextField
                        id="bh-address"
                        label="Complete Address Preview"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={completeAddress}
                        disabled
                     />

                     <TextField
                        label="Water Source (Separate every entry by using / sign.)"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        value={waterSource}
                        onChange={(e) => setWaterSource(e.target.value)}
                        disabled={isBoardinghouseEditable}
                        onKeyUp={(e) => {
                           if (e.key === "Enter") {
                              if (
                                 waterSource.charAt(waterSource.length - 2) !==
                                 "/"
                              ) {
                                 setWaterSource(waterSource + "/");
                              }
                           }
                        }}
                     />

                     <TextField
                        id="bh-tagline"
                        label="Tagline"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        helperText="A catchy tagline"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        disabled={isBoardinghouseEditable}
                     />
                     <TextField
                        id="bh-offers"
                        label="Offers (Sepate every entry by using / sign.)"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        helperText="What your boarding house offers"
                        value={offers}
                        onChange={(e) => setOffers(e.target.value)}
                        disabled={isBoardinghouseEditable}
                        onKeyUp={(e) => {
                           if (e.key === "Enter") {
                              if (offers.charAt(offers.length - 2) !== "/") {
                                 setOffers(offers + "/");
                              }
                           }
                        }}
                     />
                     <TextField
                        id="bh-protocols"
                        label="House Protocols (Separate every entry by using / sign.)"
                        variant="outlined"
                        color="primary"
                        margin="dense"
                        size="small"
                        fullWidth
                        multiline
                        rows={3}
                        helperText="Your house rules."
                        value={houseProtocols}
                        onChange={(e) => setHouseProtocols(e.target.value)}
                        disabled={isBoardinghouseEditable}
                        onKeyUp={(e) => {
                           if (e.key === "Enter") {
                              if (
                                 houseProtocols.charAt(
                                    houseProtocols.length - 2
                                 ) !== "/"
                              ) {
                                 setHouseProtocols(houseProtocols + "/");
                              }
                           }
                        }}
                     />
                  </CardContent>
               </Card>
            </Container>
         </Fade>
      </>
   );
}

export default About;
