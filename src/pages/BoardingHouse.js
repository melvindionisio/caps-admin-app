import {
  Container,
  IconButton,
  Typography,
  Slide,
  Button,
  TextField,
  CardHeader,
  Card,
  Fade,
  Avatar,
  CardContent,
  Chip,
  Box,
  // Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BackNavbar from "../components/BackNavbar";
import LoadingState from "../components/LoadingState";
import { EditOutlined } from "@mui/icons-material";
import { useState } from "react";

const BoardingHouse = () => {
  const { bhId } = useParams();
  const { data, isPending, error } = useFetch(
    `http://localhost:3500/api/boarding-houses/${bhId}`
  );

  const [isBoardinghouseEditable, setIsBoardinghouseEditable] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [severity, setSeverity] = useState("warning");
  // const [showAlert, setShowAlert] = useState("false");

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (showAlert) {
  //       setShowAlert(false);
  //     }
  //   }, 5000);
  // }, [showAlert]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
        {data && (
          <>
            <BackNavbar title={data.bh_name}>
              <IconButton></IconButton>
            </BackNavbar>
            <Fade in={true}>
              <Container
                disableGutters
                maxWidth="sm"
                sx={{ p: 2, display: "flex" }}
              >
                <Card sx={{ width: "90%", p: 2, margin: "0 auto" }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ height: "4rem", width: "4rem" }}
                        aria-label="profile-pic"
                      ></Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="edit-icon"
                        onClick={() =>
                          setIsBoardinghouseEditable(!isBoardinghouseEditable)
                        }
                      >
                        <EditOutlined />
                      </IconButton>
                    }
                    title="You are Login as: "
                    subheader="Admin"
                  />
                  <CardContent>
                    <Chip size="small" label="PROFILE" sx={{ mb: 1 }} />
                    <Box sx={{ mb: 4 }}>
                      <TextField
                        id="bh-name"
                        label="Boarding house Name"
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />
                      <TextField
                        id="bh-owner"
                        label="Owner"
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />
                      <TextField
                        id="popularity"
                        label="Popularity"
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />
                      <TextField
                        id="street-address"
                        label="Street Address"
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />
                      <TextField
                        id="zone-address"
                        label="Zone Address"
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />
                      <TextField
                        id="longitude"
                        label="Longitude"
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />
                      <TextField
                        id="latitude"
                        label="Latitude"
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />
                      <TextField
                        id="contact-number"
                        label="Contact No."
                        fullWidth
                        size="small"
                        variant="outlined"
                        margin="dense"
                        disabled={!isBoardinghouseEditable}
                      />

                      {/* <Alert
                        severity={severity}
                        sx={
                          showAlert
                            ? { display: "flex", mt: 2 }
                            : { display: "none", mt: 2 }
                        }
                      >
                        {alertMessage}
                      </Alert> */}
                      <Box
                        sx={
                          isBoardinghouseEditable
                            ? { display: "flex", justifyContent: "flex-end" }
                            : { display: "none" }
                        }
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          disableElevation
                          color="secondary"
                          sx={{ mr: 1 }}
                          onClick={() =>
                            setIsBoardinghouseEditable(!isBoardinghouseEditable)
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          disableElevation
                          onClick={handleSubmit}
                        >
                          save
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Container>
            </Fade>
          </>
        )}
      </Container>
    </Slide>
  );
};

export default BoardingHouse;
