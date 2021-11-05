import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const LoadingState = () => {
  return (
    <Box align="center" py={3} sx={{ width: "100%" }}>
      <CircularProgress variant="indeterminate" size="2.5rem" color="primary" />
    </Box>
  );
};

export default LoadingState;
