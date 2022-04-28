import { Paper, Avatar, Typography, Box } from "@mui/material";
import { red, green, lightBlue, deepPurple } from "@mui/material/colors";
import React from "react";
import { Delete, CheckOutlined } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const ReviewCard = ({
   review,
   handleApproveReview,
   handleDeleteReview,
   isDeleteReview,
   isApproveReview,
   status,
}) => {
   return (
      <Box>
         <Paper
            elevation={1}
            sx={{
               padding: 2,
               borderLeft: `3px solid ${lightBlue[500]}`,
               borderRadius: "0rem 1rem 1rem 1rem",
               width: "90%",
               transition: "150ms ease",
               "&:hover": {
                  transform: "scale(1.01)",
               },
            }}
         >
            <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
               <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {review.reviewerName.charAt(0).toUpperCase()}
               </Avatar>
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     paddingBottom: 1,
                  }}
               >
                  <Typography
                     variant="body1"
                     color="initial"
                     sx={{ fontSize: 14 }}
                  >
                     {review.reviewerName}
                  </Typography>

                  <Typography
                     variant="caption"
                     color="text.secondary"
                     sx={{
                        textTransform: "uppercase",
                        fontSize: 10,
                     }}
                  >
                     {review.date}
                  </Typography>
               </Box>
               <Box
                  sx={{
                     position: "absolute",
                     top: 1,
                     right: 1,
                     display: "flex",
                     justifyContent: "space-between",
                     gap: 1,
                  }}
               >
                  {status === "approved" ? (
                     <LoadingButton
                        size="small"
                        onClick={() => handleDeleteReview(review.id)}
                        variant="contained"
                        disableElevation
                        loading={isDeleteReview}
                        sx={{
                           background: red[50],
                           color: red[500],
                           "&:hover": {
                              background: red[100],
                           },
                        }}
                        startIcon={
                           <Delete fontSize="small" sx={{ color: red[400] }} />
                        }
                     >
                        delete
                     </LoadingButton>
                  ) : (
                     <>
                        <LoadingButton
                           size="small"
                           onClick={() => handleApproveReview(review.id)}
                           variant="contained"
                           disableElevation
                           loading={isApproveReview}
                           sx={{
                              background: green[50],
                              color: green[500],
                              "&:hover": {
                                 background: green[100],
                              },
                           }}
                           startIcon={
                              <CheckOutlined
                                 fontSize="small"
                                 sx={{ color: green[400] }}
                              />
                           }
                        >
                           approve
                        </LoadingButton>

                        <LoadingButton
                           size="small"
                           onClick={() => handleDeleteReview(review.id)}
                           variant="contained"
                           disableElevation
                           loading={isDeleteReview}
                           sx={{
                              background: red[50],
                              color: red[500],
                              "&:hover": {
                                 background: red[100],
                              },
                           }}
                           startIcon={
                              <Delete
                                 fontSize="small"
                                 sx={{ color: red[400] }}
                              />
                           }
                        >
                           reject
                        </LoadingButton>
                     </>
                  )}
               </Box>
            </Box>
            <Typography variant="body1" color="initial" sx={{ px: 5 }}>
               {review.text}
            </Typography>
            {review.last}
         </Paper>
      </Box>
   );
};

export default ReviewCard;
