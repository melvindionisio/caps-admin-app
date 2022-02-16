import React from "react";
import { Card, Box, Typography, Button, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

function OwnerCard({ handleOpen, owner }) {
   return (
      <Card sx={{ borderRadius: 2 }}>
         <Box
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",

               padding: 1.5,
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
               }}
            >
               <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {owner.name.charAt(0).toUpperCase()}
               </Avatar>
               <Typography variant="body1" sx={{ fontFamily: "Quicksand" }}>
                  {owner.name}
               </Typography>
            </Box>
            <Button
               size="medium"
               variant="contained"
               onClick={handleOpen}
               sx={{ height: "100%" }}
            >
               View
            </Button>
         </Box>
      </Card>
   );
}

export default OwnerCard;
