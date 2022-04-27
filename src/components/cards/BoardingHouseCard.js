import {
   Card,
   CardHeader,
   Typography,
   CardActionArea,
   Grid,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";

const BoardingHouseCard = ({ boardinghouse }) => {
   const location = useLocation();

   return (
      <Grid item lg={3} xs={12} md={4} sm={6}>
         <Link
            to={`${location.pathname}/${boardinghouse.id}`}
            style={{
               textDecoration: "none",
            }}
            sx={{
               "&:hover": {
                  textDecoration: "underline",
               },
            }}
         >
            <Card
               sx={{ borderRadius: 2 }}
               //variant="outlined"
            >
               <CardActionArea>
                  <CardHeader
                     avatar={<HouseIcon />}
                     title={
                        <div
                           style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "11rem",
                              minWidth: "7rem",
                           }}
                        >
                           <Typography
                              variant="body1"
                              noWrap
                              color="initial"
                              sx={{
                                 "&:hover": {
                                    textDecoration: "underline",
                                 },
                                 fontWeight: "bold",
                              }}
                           >
                              {boardinghouse.name.toUpperCase()}
                           </Typography>
                        </div>
                     }
                     subheader={
                        <>
                           <Typography variant="body2" color="text.secondary">
                              {boardinghouse.completeAddress}
                           </Typography>
                        </>
                     }
                  />
               </CardActionArea>
            </Card>
         </Link>
      </Grid>
   );
};

export default BoardingHouseCard;
