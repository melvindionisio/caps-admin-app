import React from "react";
import { Card, CardContent, CardActionArea, Typography } from "@mui/material";

function OwnerCard({ handleOpen, owner }) {
   return (
      <Card onClick={handleOpen}>
         <CardActionArea>
            <CardContent>
               <Typography variant="body1">{owner.name}</Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}

export default OwnerCard;
