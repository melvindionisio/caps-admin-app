import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import ReviewCard from "../cards/ReviewCard";
import { useParams } from "react-router-dom";
import { domain } from "../../fetch-url/fetchUrl";
import LoadingState from "../LoadingState";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const Reviews = () => {
   let scroller = useRef(null);
   const { bhId } = useParams();
   // ! to-do
   // is empty should be different in ampty pending and empty approved
   const [reviews, setReviews] = useState([]);
   const [isApprovedEmpty, setIsApprovedEmpty] = useState(false);
   const [isPendingEmpty, setIsPendingEmpty] = useState(false);
   const [isPending, setIsPending] = useState(true);
   const [isDeleteReview, setIsDeleteReview] = useState(false);
   const [isApproveReview, setIsApproveReview] = useState(false);

   const [activeReview, setActiveReview] = useState("approved");
   const handleChangeActiveReview = (event, newActiveReview) => {
      setActiveReview(newActiveReview);
   };

   useEffect(() => {
      const abortCont = new AbortController();
      setIsPending(true);
      setReviews(null);

      setTimeout(() => {
         if (activeReview === "approved") {
            setIsPendingEmpty(false);
            fetch(`${domain}/api/reviews/bh/${bhId}`, {
               signal: abortCont.signal,
            })
               .then((res) => {
                  if (!res.ok) {
                     throw Error("Something went wrong!");
                  }
                  return res.json();
               })
               .then((data) => {
                  if (data) {
                     setReviews(data);
                     setIsPending(false);
                     //scroller.current.scrollIntoView();
                  }
                  if (data.length <= 0) {
                     setIsApprovedEmpty(true);
                  }
               })
               .catch((err) => {
                  if (err.name === "AbortError") {
                     console.log("fetch aborted");
                  } else {
                     console.log(err);
                  }
               });
         } else {
            setIsApprovedEmpty(false);
            fetch(`${domain}/api/reviews/bh/pending/${bhId}`, {
               signal: abortCont.signal,
            })
               .then((res) => {
                  if (!res.ok) {
                     throw Error("Something went wrong!");
                  }
                  return res.json();
               })
               .then((data) => {
                  if (data) {
                     setReviews(data);
                     setIsPending(false);
                     //scroller.current.scrollIntoView();
                  }
                  if (data.length <= 0) {
                     setIsPendingEmpty(true);
                  }
               })
               .catch((err) => {
                  if (err.name === "AbortError") {
                     console.log("fetch aborted");
                  } else {
                     console.log(err);
                  }
               });
         }
      }, 0);

      return () => {
         abortCont.abort();
      };
   }, [bhId, activeReview]);

   const handleDeleteReview = async (reviewId) => {
      setIsDeleteReview(true);
      fetch(`${domain}/api/reviews/${reviewId}`, {
         method: "DELETE",
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setReviews(() =>
               reviews.filter((review) => review.id !== reviewId)
            );
            console.log(data.message);
            setIsDeleteReview(false);
         })
         .catch((err) => console.log(err));
   };

   const handleApproveReview = async (reviewId) => {
      setIsApproveReview(true);
      //approve request
      fetch(`${domain}/api/reviews/${reviewId}`, {
         method: "PUT",
         body: JSON.stringify({
            status: "approved",
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setIsApproveReview(false);
            setReviews(() =>
               reviews.filter((review) => review.id !== reviewId)
            );
            console.log(data.message);
         })
         .catch((err) => console.log(err));
   };

   return (
      <Container
         maxWidth="md"
         disableGutters
         sx={{
            padding: 2,
            paddingBottom: "5rem",
            height: "85vh",
            overflowY: "none",
            position: "relative",
         }}
      >
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: 1,
               height: "50vh",
               overflowY: "auto",
               padding: "1rem 5px",
               borderRadius: 1,
               position: "relative",
            }}
         >
            <Box sx={{ justifyContent: "center", display: "flex" }}>
               <ToggleButtonGroup
                  color="primary"
                  value={activeReview}
                  exclusive
                  size="small"
                  variant="contained"
                  onChange={handleChangeActiveReview}
               >
                  <ToggleButton value="pending">Pending</ToggleButton>
                  <ToggleButton value="approved">Approved</ToggleButton>
               </ToggleButtonGroup>
            </Box>
            {isPending && <LoadingState loadWhat="Reviews" />}

            {reviews &&
               reviews.map((review) => (
                  <ReviewCard
                     key={review.id}
                     review={review}
                     handleDeleteReview={handleDeleteReview}
                     handleApproveReview={handleApproveReview}
                     isDeleteReview={isDeleteReview}
                     isApproveReview={isApproveReview}
                     status={review.status}
                  />
               ))}

            {isApprovedEmpty && (
               <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 4 }}
               >
                  Reviews is empty!
               </Typography>
            )}
            {isPendingEmpty && (
               <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 4 }}
               >
                  Pending reviews is empty!
               </Typography>
            )}
            <Typography
               ref={scroller}
               align="center"
               style={{
                  marginTop: 7,
                  display: "flex",
                  justifyContent: "center",
               }}
            >
               <Typography
                  align="center"
                  variant="caption  "
                  style={{
                     height: 10,
                     width: 10,
                     borderRadius: 50,
                     background: grey[400],
                  }}
               ></Typography>
            </Typography>
         </Box>
         <Box
            sx={{
               marginTop: 1,
               display: "flex",
               justifyContent: "center",
            }}
         ></Box>
      </Container>
   );
};

export default Reviews;
