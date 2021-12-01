import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TextField, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import { CardHeader } from "@mui/material";

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
            value={bhoName}
            fullWidth
            required
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
            <Typography variant="subtitle2" color="text.secondary">
              GENERATED LOGIN FOR:{" "}
              <span
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                {bhoName}
              </span>
            </Typography>
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
const BoardingHouseDetailsFilling = () => {
  return (
    <>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        asperiores aliquid velit laudantium nulla totam error ea in doloremque
        vel delectus, corporis aperiam? Illum odio veritatis ipsam atque eos
        tempora.
      </Typography>
    </>
  );
};

const PreviewAndSave = () => {
  return (
    <>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        asperiores aliquid velit laudantium nulla totam error ea in doloremque
        vel delectus, corporis aperiam? Illum odio veritatis ipsam atque eos
        tempora.
      </Typography>
      <Box sx={{ my: 2 }}></Box>
    </>
  );
};

export default function AddBoardingHouseStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [bhoName, setBhoName] = React.useState("");
  const [ownerUserName, setOwnerUserName] = React.useState("");
  const [ownerPassword, setOwnerPassword] = React.useState("");

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
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
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
    },
    {
      label: "Fill Boardinghouse Details",
      description: <BoardingHouseDetailsFilling />,
    },
    {
      label: "Preview",
      description: <PreviewAndSave />,
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
