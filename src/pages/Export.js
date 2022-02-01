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
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

import { saveAs } from "file-saver";
import axios from "axios";

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
   const [isGeneratePending, setIsGeneratePending] = useState(false);

   const {
      data: boardinghouses,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/export`);

   const mydata = {
      name: "Melvin Dionisio",
      price1: 200,
      price2: 500,
      receiptId: 100,
   };

   const createPdf = async () => {
      setIsGeneratePending(true);
      let registeredHouse = await fetch(`${domain}/api/boarding-houses/export`);
      registeredHouse = await registeredHouse.json();

      registeredHouse = registeredHouse.map((house) => {
         return {
            id: house.id,
            name: house.name,
            owner: house.owner_name,
            street: house.street,
            zone: house.zone,
            address: `${house.street} - ${house.zone}`,
         };
      });

      fetch(`${domain}/api/pdf/generate`, {
         method: "POST",
         body: JSON.stringify(mydata),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then(() =>
            axios.get(`${domain}/api/pdf/download`, {
               responseType: "blob",
            })
         )
         .then((res) => {
            const pdfBlob = new Blob([res.data], {
               type: "application/pdf",
            });
            saveAs(pdfBlob, "uep-registered-boardinghouse.pdf");
            setIsGeneratePending(false);
         })
         .catch((err) => console.log(err));
   };

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
               {boardinghouses && (
                  <>
                     <BoardingHouseTable data={boardinghouses} />
                     <Box
                        sx={{
                           alignSelf: "flex-end",
                           display: "flex",
                           gap: 1,
                           mt: 1,
                        }}
                     >
                        <LoadingButton
                           variant="contained"
                           color="secondary"
                           startIcon={<PictureAsPdfIcon />}
                           onClick={createPdf}
                           loading={isGeneratePending}
                        >
                           Download as PDF
                        </LoadingButton>
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
