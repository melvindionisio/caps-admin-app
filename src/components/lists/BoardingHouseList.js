import { Grid } from "@mui/material";
import React from "react";
import BoardingHouseCard from "../cards/BoardingHouseCard";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const BoardingHouseList = ({ boardinghouses }) => {
   const [isEmpty, setIsEmpty] = useState(false);

   useEffect(() => {
      if (boardinghouses) {
         if (boardinghouses.length <= 0) {
            setIsEmpty(true);
         } else {
            setIsEmpty(false);
         }
      }
   }, [boardinghouses]);

   return (
      <>
         {isEmpty && (
            <Typography
               align="center"
               variant="body1"
               color="text.secondary"
               sx={{ fontFamily: "Quicksand", py: 5, fontSize: 15 }}
            >
               No Boarding house yet.
            </Typography>
         )}

         <Grid container spacing={2}>
            {boardinghouses &&
               boardinghouses.map((boardinghouse) => (
                  <BoardingHouseCard
                     boardinghouse={boardinghouse}
                     key={boardinghouse.id}
                  />
               ))}
         </Grid>
      </>
   );
};

export default BoardingHouseList;
