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
import { CheckOutlined } from "@mui/icons-material";

function PendingReviewCard({
   review,
   handleApproveReview,
   handleRejectReview,
   isApprovePending,
   isRejectPending,
}) {
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
                  ? `A review for ... boarding house | ${review.date}`
                  : "Empty"
            }
            action={
               review && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                     <Button
                        startIcon={<CheckOutlined />}
                        variant="contained"
                        size="small"
                        color="success"
                        disableElevation
                        onClick={() => handleApproveReview(review.id)}
                        disabled={isApprovePending}
                     >
                        Approve
                     </Button>
                     <Button
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        size="small"
                        color="error"
                        disableElevation
                        disabled={isRejectPending}
                        onClick={() => handleRejectReview(review.id)}
                     >
                        Reject
                     </Button>
                  </Box>
               )
            }
         />
         <CardContent>
            {review ? review.text : "Please select a review to view."}
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
