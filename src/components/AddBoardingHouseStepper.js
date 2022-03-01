import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
   TextField,
   Grid,
   List,
   ListItem,
   Divider,
   Alert,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
} from "@mui/material";
import { CardHeader } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { domain } from "../fetch-url/fetchUrl";

const OwnerAccountGeneration = ({
   bhoName,
   setBhoName,
   generateOwnerAccount,
   ownerUserName,
   ownerPassword,
   showGenerated,
}) => {
   return (
      <Box
         style={{
            padding: 2,
            marginBottom: 10,
            display: "flex",
            flexDirection: "column",
         }}
      >
         <Typography variant="body1">
            Create owner account first. This account will be used by the owner
            using the Search 'N Stay Owner control panel.
         </Typography>
         <Grid container spacing={1} sx={{ my: 2 }}>
            <Grid item xs={12} lg={8}>
               <TextField
                  size="small"
                  id="bh-owner"
                  label="Owner Full Name"
                  color="primary"
                  fullWidth
                  required
                  autoFocus
                  value={bhoName}
                  onChange={(e) => setBhoName(e.target.value)}
               />
            </Grid>
            <Grid item xs={12} lg={4}>
               <Button
                  color="secondary"
                  variant="contained"
                  disableElevation
                  onClick={generateOwnerAccount}
                  disabled={!bhoName}
               >
                  Generate Account
               </Button>
            </Grid>
         </Grid>
         <Card
            sx={
               showGenerated
                  ? { minWidth: "max-content", maxWidth: 350, display: "block" }
                  : { display: "none" }
            }
         >
            <CardHeader
               title={
                  <>
                     <Typography
                        variant="subtitle2"
                        style={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           marginBottom: ".5rem",
                        }}
                        color="text.secondary"
                     >
                        <LockOpenIcon
                           fontSize="small"
                           style={{ marginRight: 2 }}
                        />
                        GENERATED LOGIN FOR:{" "}
                     </Typography>
                     <Divider />
                     <Typography
                        variant="overline"
                        component="p"
                        color="initial"
                        style={{
                           fontSize: 15,
                           fontWeight: "bold",
                           fontFamily: "Quicksand",
                           color: "grey",
                        }}
                        align="center"
                     >
                        {" "}
                        {bhoName}
                     </Typography>
                  </>
               }
               subheader={
                  <>
                     <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" color="text.secondary">
                           USERNAME:
                        </Typography>
                        <TextField
                           size="small"
                           value={ownerUserName}
                           variant="outlined"
                           sx={{ ml: 1 }}
                        />
                     </Box>

                     <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle2" color="text.secondary">
                           PASSWORD:
                        </Typography>

                        <TextField
                           size="small"
                           value={ownerPassword}
                           variant="outlined"
                           sx={{ ml: 1 }}
                        />
                     </Box>
                  </>
               }
            />
         </Card>
      </Box>
   );
};

const BoardingHouseDetailsFilling = ({
   bhName,
   setBhName,
   bhoName,
   streetAddress,
   setStreetAddress,
   zoneAddress,
   setZoneAddress,
   completeAddress,
   setCompleteAddress,
   longitude,
   setLongitude,
   latitude,
   setLatitude,
   contactNumber,
   setContactNumber,
   tagline,
   setTagline,
}) => {
   return (
      <Box>
         <Typography variant="body1">
            Boarding house details filling out |
            <span style={{ color: "grey" }}> Optional</span>
         </Typography>

         {/* Boarding House details fillin out - optional */}
         <Box sx={{ my: 3 }}>
            <TextField
               id="bh-name"
               label="Boarding House Name"
               variant="outlined"
               color="primary"
               margin="dense"
               size="small"
               fullWidth
               value={bhName}
               onChange={(e) => setBhName(e.target.value)}
               autoFocus
            />
            <TextField
               id="bh-owner"
               label="Owner Name"
               variant="outlined"
               color="primary"
               margin="dense"
               size="small"
               fullWidth
               helperText="Owner Full Name"
               value={bhoName}
               disabled
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 1 }}>
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
                     setCompleteAddress(
                        `${e.target.value} - ${zoneAddress}, UEP`
                     );
                  }}
               />
               <FormControl sx={{ width: 200, mt: ".3rem" }}>
                  <InputLabel size="small" id="demo-simple-select-label">
                     Zone Address
                  </InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={zoneAddress}
                     size="small"
                     label="Zone Address"
                     onChange={(e) => {
                        setZoneAddress(e.target.value);
                        setCompleteAddress(
                           `${streetAddress} - ${zoneAddress}, UEP`
                        );
                     }}
                  >
                     <MenuItem value={"Zone 1"}>Zone 1, UEP</MenuItem>
                     <MenuItem value={"Zone 2"}>Zone 2, UEP</MenuItem>
                     <MenuItem value={"Zone 3"}>Zone 3, UEP</MenuItem>
                  </Select>
               </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 1 }}>
               <TextField
                  id="longitude"
                  label="Longitude"
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
               />
               <TextField
                  id="latitude"
                  label="Latitude"
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
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
               id="bh-contacts"
               label="Contact Number"
               variant="outlined"
               color="primary"
               margin="dense"
               size="small"
               fullWidth
               helperText="Ex. 09166809369"
               type="number"
               value={contactNumber}
               onChange={(e) => setContactNumber(e.target.value)}
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
            />
         </Box>
      </Box>
   );
};

const PreviewAndSave = ({
   bhoName,
   ownerUserName,
   ownerPassword,
   bhName,
   completeAddress,
   contactNumber,
   tagline,
}) => {
   const DataListItem = ({ title, value }) => {
      return (
         <ListItem
            divider
            style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "start",
            }}
         >
            <Typography variant="body2" color="text.secondary">
               {title}
            </Typography>
            <Typography variant="body1" color="initial" sx={{ fontSize: 18 }}>
               {value}
            </Typography>
         </ListItem>
      );
   };
   return (
      <>
         <Typography variant="body1">
            This is the preview where you will see all the information that
            filled out a minute ago.
         </Typography>
         <Box sx={{ my: 2 }}>
            <List sx={{ maxWidth: 500 }}>
               <DataListItem title="Owner Name" value={bhoName} />
               <DataListItem
                  title="Owner Login Username"
                  value={ownerUserName}
               />
               <DataListItem
                  title="Owner Login Password"
                  value={ownerPassword}
               />
               <DataListItem title="Boardinghouse Name" value={bhName} />
               <DataListItem title="Address" value={completeAddress} />
               <DataListItem title="Contact Number" value={contactNumber} />
               <DataListItem title="Tagline" value={tagline} />
            </List>
         </Box>
      </>
   );
};

export default function AddBoardingHouseStepper() {
   // first step
   const [activeStep, setActiveStep] = useState(0);
   const [bhoName, setBhoName] = useState("");
   const [ownerUserName, setOwnerUserName] = useState("");
   const [ownerPassword, setOwnerPassword] = useState("");
   const [showGenerated, setShowGenerated] = useState(false);

   // second step
   const [bhName, setBhName] = useState("");
   const [streetAddress, setStreetAddress] = useState("");
   const [zoneAddress, setZoneAddress] = useState("Zone 1");
   const [completeAddress, setCompleteAddress] = useState("");
   const [longitude, setLongitude] = useState(0);
   const [latitude, setLatitude] = useState(0);
   const [contactNumber, setContactNumber] = useState("09");
   const [tagline, setTagline] = useState("");

   const [message, setMessage] = useState("");
   const [showAlert, setShowAlert] = useState(false);
   const [severity, setSeverity] = useState("warning");

   useEffect(() => {
      setTimeout(() => {
         if (showAlert) {
            setShowAlert(false);
         }
      }, 5000);
   }, [showAlert]);

   const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   const generateOwnerAccount = () => {
      const generateUsername = (name) => {
         return `${name.toLowerCase().replace(/\s+/g, "")}${getRandomInt(
            123,
            456
         )}`;
      };

      const generateRandomPassword = (length) => {
         let generatedPassword = "";
         let counter = 0;
         const pass_src =
            "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&#@";
         for (counter = 2; counter <= length; counter++) {
            const char = Math.floor(Math.random() * pass_src.length + 1);
            generatedPassword += pass_src.charAt(char);
         }
         return generatedPassword;
      };

      setOwnerPassword(generateRandomPassword(10));
      setOwnerUserName(generateUsername(bhoName));
      setIsOptional(true);
      setShowGenerated(true);
   };

   const [isOptional, setIsOptional] = useState(false);

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleReset = () => {
      setActiveStep("");
      setBhoName("");
      setOwnerUserName("");
      setOwnerPassword("");
      setBhName("");
      setStreetAddress("");
      setZoneAddress("");
      setCompleteAddress("");
      setLongitude(0);
      setLatitude(0);
      setContactNumber("");
      setTagline("");
      setIsOptional(false);

      setActiveStep(0);
   };

   const steps = [
      {
         label: "Generate Owner Credentials",
         description: (
            <OwnerAccountGeneration
               bhoName={bhoName}
               setBhoName={setBhoName}
               generateOwnerAccount={generateOwnerAccount}
               ownerUserName={ownerUserName}
               ownerPassword={ownerPassword}
               showGenerated={showGenerated}
            />
         ),
         isOptional: isOptional,
      },
      {
         label: "Fill Primary Boardinghouse Details",

         description: (
            <BoardingHouseDetailsFilling
               bhName={bhName}
               setBhName={setBhName}
               bhoName={bhoName}
               streetAddress={streetAddress}
               setStreetAddress={setStreetAddress}
               zoneAddress={zoneAddress}
               setZoneAddress={setZoneAddress}
               completeAddress={completeAddress}
               setCompleteAddress={setCompleteAddress}
               longitude={longitude}
               setLongitude={setLongitude}
               latitude={latitude}
               setLatitude={setLatitude}
               contactNumber={contactNumber}
               setContactNumber={setContactNumber}
               tagLine={tagline}
               setTagline={setTagline}
            />
         ),
         isOptional: isOptional,
      },
      {
         label: "Preview",
         description: (
            <PreviewAndSave
               bhoName={bhoName}
               ownerUserName={ownerUserName}
               ownerPassword={ownerPassword}
               bhName={bhName}
               completeAddress={completeAddress}
               contactNumber={contactNumber}
               tagline={tagline}
            />
         ),
         isOptional: isOptional,
      },
   ];

   const handleSubmitBoardingHouse = async (e) => {
      e.preventDefault();
      fetch(`${domain}/api/owners/register`, {
         method: "POST",
         body: JSON.stringify({
            name: bhoName,
            username: ownerUserName,
            password: ownerPassword,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            console.log(data.ownerId);
            // THIS IS THE SECOND REQUEST TO ADD BASIC DETAILS FOR BH

            fetch(`${domain}/api/boarding-houses/register/${data.ownerId}`, {
               method: "POST",
               body: JSON.stringify({
                  boardinghouse_owner: bhoName,
                  boardinghouse_name: bhName,
                  street_address: streetAddress,
                  zone_address: zoneAddress,
                  complete_address: completeAddress,
                  longitude: longitude,
                  latitude: latitude,
                  contact_number: contactNumber,
                  tagline: tagline,
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
                  setMessage(data.message);
                  setShowAlert(true);
                  setSeverity("success");
               })
               .catch((err) => console.log(err));
         });

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   return (
      <Box>
         <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ borderRadius: 3 }}
         >
            {steps.map((step, index) => (
               <Step key={step.label}>
                  <StepLabel
                     optional={
                        index === 2 ? (
                           <Typography variant="caption">Last step</Typography>
                        ) : index === 1 ? (
                           <Typography variant="caption">Optional</Typography>
                        ) : null
                     }
                  >
                     {step.label}
                  </StepLabel>

                  <StepContent>
                     <Box>{step.description}</Box>
                     <Box sx={{ mb: 2 }}>
                        <div>
                           <Button
                              variant="contained"
                              onClick={
                                 index === steps.length - 1
                                    ? handleSubmitBoardingHouse
                                    : handleNext
                              }
                              sx={{ mt: 1, mr: 1 }}
                              disabled={!step.isOptional}
                           >
                              {index === steps.length - 1 ? "Finish" : "Save"}
                           </Button>
                           <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                           >
                              Back
                           </Button>
                        </div>
                     </Box>
                  </StepContent>
               </Step>
            ))}
         </Stepper>
         {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
               <Typography>
                  All steps completed - you&apos;re finished
               </Typography>
               <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
               </Button>
            </Paper>
         )}
         <Alert
            severity={severity}
            sx={
               showAlert
                  ? { display: "flex", mt: 2 }
                  : { display: "none", mt: 2 }
            }
         >
            {message}
         </Alert>
      </Box>
   );
}
