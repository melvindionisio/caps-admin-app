import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField, Grid, List, ListItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import { CardHeader } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const OwnerAccountGeneration = ({
  bhoName,
  setBhoName,
  generateOwnerAccount,
  ownerUserName,
  ownerPassword,
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        asperiores aliquid velit laudantium nulla totam error ea in doloremque
        vel delectus, corporis aperiam? Illum odio veritatis ipsam atque eos
        tempora.
      </Typography>
      <Grid container spacing={1} sx={{ my: 2 }}>
        <Grid item xs={12} lg={8}>
          <TextField
            size="small"
            id="bh-owner"
            label="Owner Full Name"
            color="secondary"
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
            onClick={generateOwnerAccount}
            disabled={!bhoName}
          >
            Generate Account
          </Button>
        </Grid>
      </Grid>
      <Card sx={{ maxWidth: "max-content" }}>
        <CardHeader
          title={
            <>
              <Typography
                variant="subtitle2"
                style={{ display: "flex", alignItems: "center" }}
                color="text.secondary"
              >
                <LockOpenIcon fontSize="small" style={{ marginRight: 2 }} />
                GENERATED LOGIN FOR:{" "}
              </Typography>
              <Typography
                variant="overline"
                color="initial"
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                {" "}
                {bhoName}
              </Typography>
            </>
          }
          subheader={
            <>
              <Typography variant="subtitle2" color="text.secondary">
                USERNAME:
                <span
                  style={{ marginLeft: 10, fontSize: 18, color: blue[600] }}
                >
                  {ownerUserName}
                </span>
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                PASSWORD:
                <span
                  style={{ marginLeft: 10, fontSize: 18, color: blue[600] }}
                >
                  {ownerPassword}
                </span>
              </Typography>
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
  completeAddress,
  setCompleteAddress,
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
          color="secondary"
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
          color="secondary"
          margin="dense"
          size="small"
          fullWidth
          helperText="Owner Full Name"
          value={bhoName}
          disabled
        />
        <TextField
          id="bh-address"
          label="Complete Address"
          variant="outlined"
          color="secondary"
          margin="dense"
          size="small"
          fullWidth
          value={completeAddress}
          onChange={(e) => setCompleteAddress(e.target.value)}
        />
        <TextField
          id="bh-contacts"
          label="Contact Number"
          variant="outlined"
          color="secondary"
          margin="dense"
          size="small"
          fullWidth
          type="number"
          helperText="Ex. 09166809369"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <TextField
          id="bh-tagline"
          label="Tagline"
          variant="outlined"
          color="secondary"
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
        This is the preview where you will see all the information that filled
        out a minute ago.
      </Typography>
      <Box sx={{ my: 2 }}>
        <List sx={{ maxWidth: 500 }}>
          <DataListItem title="Owner Name" value={bhoName} />
          <DataListItem title="Owner Login Username" value={ownerUserName} />
          <DataListItem title="Owner Login Password" value={ownerPassword} />
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

  // second step
  const [bhName, setBhName] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [tagline, setTagline] = useState("");

  // data to be sent to the database
  // const ownerAccountData = {
  //   boardingHouseOwnerName: bhoName,
  //   ownerUserName: ownerUserName,
  //   ownerPassword: ownerPassword,
  //   boardingHouseName: bhName,
  //   completeAddress: completeAddress,
  //   contactNumber: contactNumber,
  //   boardingHouseTagline: tagline,
  // };

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

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateUsername = () => {
    return `${bhoName.toLowerCase().replace(/\s+/g, "")}${getRandomInt(
      123,
      456
    )}`;
  };

  const generateOwnerAccount = () => {
    setOwnerPassword(generateRandomPassword(10));
    setOwnerUserName(generateUsername());
    setIsOptional(true);
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
    setCompleteAddress("");
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
          completeAddress={completeAddress}
          setCompleteAddress={setCompleteAddress}
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

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
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
                    onClick={handleNext}
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
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
