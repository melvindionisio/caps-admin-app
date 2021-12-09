import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  // CardActionArea,
  Box,
} from "@mui/material";
import React from "react";
import { purple } from "@mui/material/colors";

const BoardingHouseCard = () => {
  return (
    <Card sx={{ width: 350, borderRadius: 2 }} elevation={2}>
      {/* <CardActionArea> */}
      <CardHeader
        avatar={<Avatar aria-label="owner-pic"></Avatar>}
        title="Owner"
        subheader="Contact No."
      />
      <CardContent
        sx={{
          background: purple[300],
          borderRadius: "1rem 1rem 0rem 0rem",
          "&:last-child": {
            paddingBottom: 1,
          },
          // boxShadow: "0 0 3px 1px rgba(0,0,0,0.3)",
        }}
      >
        <Box>
          <Typography variant="body1" color="initial">
            Boaring House Name
          </Typography>
          <Typography variant="overline" color="initial">
            Address
          </Typography>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default BoardingHouseCard;
