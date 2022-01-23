import { Container, Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import useFetch from "../hooks/useFetch";
import BoardingHouseTable from "../components/BoardingHouseTable";
import { grey } from "@mui/material/colors";
import HomeNavigation from "../components/HomeNavigation";
import LoadingState from "../components/LoadingState";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { domain } from "../fetch-url/fetchUrl";

const useStyles = makeStyles((theme) => ({
   mainContent: {
      width: "100%",
      height: "100vh",
      background: grey[50],
   },
   content: {
      display: "flex",
      flexDirection: "column",
   },
   toolbar: {
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.up("md")]: {
         padding: "0 1rem",
      },
      [theme.breakpoints.down("sm")]: {
         paddingRight: ".5rem",
         paddingLeft: "0rem",
      },
   },
   actionContainer: {
      display: "flex",
      alignItems: "center",
   },
}));

const Export = ({ handleDrawerToggle }) => {
   const classes = useStyles();
   const {
      data: boardingHouses,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/export`);

   return (
      <Container disableGutters maxWidth="xl" sx={{ minHeight: "100vh" }}>
         <HomeNavigation
            title="Export"
            handleDrawerToggle={handleDrawerToggle}
         />
         <Box className={classes.mainContent}>
            <Box p={2} style={{ height: "85%" }} className={classes.content}>
               {error && <Typography>{error}</Typography>}
               {isPending && <LoadingState />}
               {boardingHouses && (
                  <>
                     <BoardingHouseTable data={boardingHouses} />
                     <Box
                        sx={{
                           alignSelf: "flex-end",
                           display: "flex",
                           gap: 1,
                           mt: 1,
                        }}
                     >
                        <Button
                           variant="contained"
                           color="secondary"
                           startIcon={<PictureAsPdfIcon />}
                        >
                           Download as PDF
                        </Button>
                        <Button
                           variant="contained"
                           color="primary"
                           startIcon={<ArticleIcon />}
                        >
                           Download as Excel
                        </Button>
                     </Box>
                  </>
               )}
            </Box>
         </Box>
      </Container>
   );
};

export default Export;
