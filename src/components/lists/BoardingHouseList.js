import { Grid } from "@mui/material";
import React from "react";
import BoardingHouseCard from "../cards/BoardingHouseCard";

const BoardingHouseList = () => {
  return (
    <Grid container spacing={2}>
      <BoardingHouseCard />
    </Grid>
  );
};

export default BoardingHouseList;
