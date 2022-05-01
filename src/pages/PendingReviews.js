import React, { useState, useEffect } from "react";
import {
   List,
   Typography,
   ListItem,
   Grid,
   Container,
   ListItemButton,
   ListItemText,
   Box,
   Divider,
} from "@mui/material";
import HomeNavigation from "../components/HomeNavigation";
import PendingReviewCard from "../components/PendingReviewCard";
import useFetch from "../hooks/useFetch";
import { domain } from "../fetch-url/fetchUrl";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { grey, blue } from "@mui/material/colors";
import LoadingState from "../components/LoadingState";

const ReviewList = ({
   reviews,
   // isPending,
   // error,
   setCurrentReview,
   currentReview,
}) => {
   return (
      <List disablePadding>
         {reviews &&
            reviews.map((review) => (
               <ListItem
                  button
                  disablePadding
                  sx={
                     review?.id === currentReview?.id
                        ? {
                             background: blue[50],
                             color: blue[500],
                          }
                        : { background: "transparent" }
                  }
                  key={review.id}
                  onClick={() => setCurrentReview(review)}
               >
                  <ListItemButton>
                     <ListItemText primary={review.reviewerName} />
                  </ListItemButton>
               </ListItem>
            ))}
      </List>
   );
};

function PendingReviews({ handleDrawerToggle }) {
   // const [reviews, setReviews] = useState([
   //    {
   //       id: 0,
   //       reviewerName: "Melvin Dionisio",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 1,
   //       reviewerName: "Jhelan Anabo",
   //       reviewText: "hello yawa",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 3,
   //       reviewerName: " Ivan Arang",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 4,
   //       reviewerName: "Melvin Dionisio",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 5,
   //       reviewerName: "Jhelan Anabo",
   //       reviewText: "hello yawa",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 6,
   //       reviewerName: " Ivan Arang",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 7,
   //       reviewerName: "Melvin Dionisio",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 8,
   //       reviewerName: "Jhelan Anabo",
   //       reviewText: "hello yawa",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 9,
   //       reviewerName: " Ivan Arang",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },

   //    {
   //       id: 10,
   //       reviewerName: " Ivan Arang",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 11,
   //       reviewerName: "Melvin Dionisio",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 12,
   //       reviewerName: "Jhelan Anabo",
   //       reviewText: "hello yawa",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 13,
   //       reviewerName: " Ivan Arang",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 14,
   //       reviewerName: "Melvin Dionisio",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 15,
   //       reviewerName: "Jhelan Anabo",
   //       reviewText: "hello yawa",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   //    {
   //       id: 16,
   //       reviewerName: " Ivan Arang",
   //       reviewText: " Yawa man ine",
   //       reviewDate: "10-10-10",
   //       status: "pending",
   //    },
   // ]);

   const [reviews, setReviews] = useState([]);
   const [isPendingReviewsEmpty, setIsPendingReviewsEmpty] = useState(false);
   const [currentReview, setCurrentReview] = useState(null);

   const [isApprovePending, setIsApprovePending] = useState(false);
   const [iseRejectPending, setIsRejectPending] = useState(false);

   const {
      data: pendingReviews,
      error,
      isPending,
   } = useFetch(`${domain}/api/reviews/pending-reviews`);

   const handleApproveReview = async (reviewId) => {
      // console.log(`Review with review ID of ${reviewId} has been approved!`);
      setIsApprovePending(true);
      //let the review display in seeker app
      //move the currentReview to the next if approve
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
            setIsApprovePending(false);
            setReviews(() =>
               reviews.filter((review) => review.id !== reviewId)
            );
            console.log(data.message);
         })
         .catch((err) => console.log(err));
   };

   const handleRejectReview = async (reviewId) => {
      setIsRejectPending(true);
      // console.log(`Review with review ID of ${reviewId} has been rejected!`);
      //delete in pending reviews
      //filter reviewList
      //move the currentReview to the next if reject
      fetch(`${domain}/api/reviews/${reviewId}`, {
         method: "DELETE",
      })
         .then((res) => {
            return res.json();
         })
         .then((data) => {
            setIsRejectPending(false);
            setReviews(() =>
               reviews.filter((review) => review.id !== reviewId)
            );
            console.log(data.message);
         })
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      if (reviews) {
         reviews.length <= 0
            ? setIsPendingReviewsEmpty(true)
            : setIsPendingReviewsEmpty(false);
      }
   }, [reviews]);

   useEffect(() => {
      if (pendingReviews) {
         if (pendingReviews.length <= 0) {
            setIsPendingReviewsEmpty(true);
         } else {
            setReviews(pendingReviews);
         }
      }
   }, [pendingReviews]);

   useEffect(() => {
      setCurrentReview(reviews[0]);
   }, [setCurrentReview, reviews]);

   return (
      <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
         <HomeNavigation
            title="Pending Reviews"
            icon={<PendingActionsIcon sx={{ color: grey[500] }} />}
            handleDrawerToggle={handleDrawerToggle}
         />

         <Container maxWidth="xl" sx={{ p: 2, pt: 5, pb: 5 }} disableGutters>
            <Grid container spacing={2}>
               <Grid item xs={12} md={8}>
                  <Typography
                     variant="body2"
                     sx={{ mb: 2 }}
                     color="text.secondary"
                  >
                     These reviews are given by the boarding house seeker and
                     will only appear in each boarding house profiles after
                     being approved.
                  </Typography>

                  <PendingReviewCard
                     review={currentReview}
                     handleApproveReview={handleApproveReview}
                     handleRejectReview={handleRejectReview}
                     isApprovePending={isApprovePending}
                     iseRejectPending={iseRejectPending}
                  />
               </Grid>
               <Grid item xs={12} md={4}>
                  <Typography
                     align="center"
                     sx={{ width: "100%", fontWeight: "bold" }}
                  >
                     PENDING REVIEWS
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Box
                     sx={{
                        background: "#fff",
                        borderRadius: 1,
                        height: "75vh",
                        overflowY: "scroll",
                     }}
                  >
                     {isPendingReviewsEmpty ? (
                        <Typography
                           align="center"
                           variant="caption"
                           component="p"
                           color="error"
                           sx={{ mt: 5 }}
                        >
                           Pending Reviews is empty!
                        </Typography>
                     ) : (
                        <>
                           {error && (
                              <Typography
                                 align="center"
                                 variant="caption"
                                 component="p"
                                 color="error"
                                 sx={{ mt: 5 }}
                              >
                                 Pending Reviews is empty!
                              </Typography>
                           )}
                           {isPending && <LoadingState />}
                           <ReviewList
                              reviews={reviews}
                              setCurrentReview={setCurrentReview}
                              currentReview={currentReview}
                              //isPending={isPending}
                              //error={error}
                           />
                        </>
                     )}
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </Container>
   );
}

export default PendingReviews;
