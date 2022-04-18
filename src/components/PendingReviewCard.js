import React from "react";
import {
   Card,
   CardHeader,
   CardContent,
   Button,
   Box,
   Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function PendingReviewCard({ review, approveReview, rejectReview }) {
   return (
      <Card
         sx={{
            background: "#fff",
            borderRadius: 1,
            minHeight: "20vh",
            position: "relative",
         }}
      >
         <CardHeader
            title={review ? review.reviewerName : "Empty"}
            subheader={
               review
                  ? `A review for ... boarding house | ${review.reviewDate}`
                  : "Empty"
            }
            action={
               <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                     startIcon={<DeleteIcon />}
                     variant="contained"
                     size="small"
                     color="success"
                     disableElevation
                     onClick={approveReview}
                  >
                     Approve
                  </Button>
                  <Button
                     startIcon={<DeleteIcon />}
                     variant="contained"
                     size="small"
                     color="error"
                     disableElevation
                     onClick={rejectReview}
                  >
                     Reject
                  </Button>
               </Box>
            }
         />
         <CardContent>
            {review ? review.reviewText : "Please select a review to view."}
         </CardContent>
         <Typography
            variant="caption"
            sx={{
               fontStyle: "italic",
               position: "absolute",
               right: 10,
               bottom: 10,
            }}
         >
            *Pending
         </Typography>
      </Card>
   );
}

export default PendingReviewCard;
