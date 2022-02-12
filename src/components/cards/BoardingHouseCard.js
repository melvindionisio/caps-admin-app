import {
   Card,
   CardHeader,
   Avatar,
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
            <Card sx={{ borderRadius: 2 }} variant="outlined">
               <CardActionArea>
                  <CardHeader
                     avatar={
                        <Avatar color="primary">
                           <HouseIcon />
                        </Avatar>
                     }
                     title={
                        <Typography
                           variant="body1"
                           color="initial"
                           sx={{
                              "&:hover": {
                                 textDecoration: "underline",
                              },
                           }}
                        >
                           {boardinghouse.name}
                        </Typography>
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
