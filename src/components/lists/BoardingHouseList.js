import { Grid } from "@mui/material";
import React from "react";
import BoardingHouseCard from "../cards/BoardingHouseCard";

const BoardingHouseList = ({ boardinghouses }) => {
  return (
    <Grid container spacing={2}>
      {boardinghouses &&
        boardinghouses.map((boardinghouse) => (
          <BoardingHouseCard
            boardinghouse={boardinghouse}
            key={boardinghouse.id}
          />
        ))}
    </Grid>
  );
};

export default BoardingHouseList;
