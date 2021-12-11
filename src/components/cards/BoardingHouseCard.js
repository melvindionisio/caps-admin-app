import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardActionArea,
  Grid,
} from "@mui/material";
import React from "react";

const BoardingHouseCard = () => {
  return (
    <Grid item lg={3} xs={12} md={4} sm={6}>
      <Card sx={{ borderRadius: 2 }}>
        <CardActionArea>
          <CardHeader
            avatar={<Avatar aria-label="owner-pic"></Avatar>}
            title={
              <Typography variant="body1" color="initial">
                Boarding house Name
              </Typography>
            }
            subheader={
              <>
                <Typography variant="body2" color="text.secondary">
                  Owner
                </Typography>
              </>
            }
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default BoardingHouseCard;
