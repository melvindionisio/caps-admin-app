import useFetch from "../../hooks/useFetch";
import BoardingHouseList from "./BoardingHouseList";
import LoadingState from "../LoadingState";
import { Typography } from "@mui/material";
import { domain } from "../../fetch-url/fetchUrl";

const AllByZone = ({ zone }) => {
   const { data, isPending, error } = useFetch(
      `${domain}/api/boarding-houses/by-zone/${zone}`
   );
   return (
      <>
         {error && (
            <Typography variant="overline" color="initial">
               {error}
            </Typography>
         )}
         {data && data.length <= 0 ? (
            <Typography
               variant="body1"
               align="center"
               color="text.secondary"
               sx={{ fontFamily: "Quicksand", fontSize: 15, py: 5 }}
            >
               {" "}
               No Boarding house for{" "}
               {zone.charAt(0).toUpperCase() +
                  zone.slice(1).replace(/-/g, " ")}{" "}
               yet.
            </Typography>
         ) : (
            <BoardingHouseList boardinghouses={data} />
         )}
         {isPending && <LoadingState />}
      </>
   );
};

export default AllByZone;
