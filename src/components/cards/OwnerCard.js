import React from "react";
import { Card, Box, Typography, Button, Avatar } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

function OwnerCard({ handleOpen, owner }) {
   return (
      <Card>
         <Box
            sx={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               padding: 1.5,
            }}
         >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
               <Avatar>
                  <AssignmentIndIcon />
               </Avatar>
               <Typography variant="body1" sx={{ fontFamily: "Quicksand" }}>
                  {owner.name}
               </Typography>
            </Box>
            <Button size="small" variant="contained" onClick={handleOpen}>
               View
            </Button>
         </Box>
      </Card>
   );
}

export default OwnerCard;
