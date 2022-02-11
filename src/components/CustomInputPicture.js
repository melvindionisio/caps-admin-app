import {
   Button,
   Card,
   Typography,
   CardHeader,
   CardContent,
   IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import React from "react";

const useStyles = makeStyles({
   previewImage: {
      width: "100%",
      borderRadius: ".2rem",
      marginBottom: "-.3rem",
   },
   cardheader: {
      marginBottom: "0px",
      paddingBottom: 0,
   },
   cardContent: {
      objectFit: "cover",
      padding: ".5rem",
      "&:last-child": {
         paddingBottom: ".5rem",
      },
      position: "relative",
      minHeight: "10rem",
   },
   actionButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
   },
   actionButtons: {
      width: "48%",
   },
   addIcon: {
      height: "3rem",
      width: "3rem",
   },
});

const CustomInputPicture = ({
   imagePreview,
   setImagePreview,
   imageName,
   setImageName,
   setRoomPicture,
}) => {
   const classes = useStyles();

   const handleFilePick = (e) => {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setImageName(`${e.target.files[0].name}`);
      setRoomPicture(e.target.files[0]);
   };
   const handleRemovePicture = () => {
      setImagePreview(null);
      setImageName("Photo removed.");
      setRoomPicture(null);
   };
   return (
      <>
         <Card
            variant="outlined"
            sx={{
               margin: "0 auto",
               width: "98%",
               minHeight: "10rem",
               marginBottom: "1rem",
            }}
         >
            <CardHeader
               title={
                  imageName ? (
                     <Typography align="center" variant="subtitle2">
                        {imageName}
                     </Typography>
                  ) : (
                     <Typography align="center" variant="body1">
                        Select image
                     </Typography>
                  )
               }
               className={classes.cardheader}
            />
            <CardContent
               className={classes.cardContent}
               sx={{ position: "relative", padding: ".5rem" }}
            >
               {imagePreview ? (
                  <img
                     src={imagePreview}
                     className={classes.previewImage}
                     alt="room"
                  />
               ) : (
                  <IconButton
                     component="label"
                     htmlFor="file-picker"
                     sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -60%)",
                        height: "8rem",
                        width: "8rem",
                     }}
                     color="primary"
                  >
                     <AddPhotoAlternateOutlinedIcon
                        className={classes.addIcon}
                     />
                  </IconButton>
               )}
            </CardContent>
         </Card>
         <div className={classes.actionButtonContainer}>
            <Button
               className={`${classes.actionButtons} ${classes.filePicker}`}
               variant="contained"
               color={imagePreview ? "secondary" : "primary"}
               component="label"
               htmlFor="file-picker"
               size="small"
               disableElevation
            >
               {imagePreview ? "Replace Picture" : "Add Picture"}
            </Button>
            <Button
               className={`${classes.actionButtons}`}
               variant="contained"
               onClick={handleRemovePicture}
               disabled={!imagePreview}
               size="small"
               disableElevation
            >
               Remove
            </Button>
            <input
               id="file-picker"
               onChange={handleFilePick}
               hidden="hidden"
               type="file"
               accept="image/*"
            />
         </div>
      </>
   );
};

export default CustomInputPicture;
