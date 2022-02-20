import {
   Container,
   Box,
   Typography,
   Modal,
   Fade,
   Backdrop,
   TextField,
   Button,
   Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useFetch from "../hooks/useFetch";
import BoardingHouseTable from "../components/BoardingHouseTable";
import { grey, red } from "@mui/material/colors";
import HomeNavigation from "../components/HomeNavigation";
import LoadingState from "../components/LoadingState";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { domain } from "../fetch-url/fetchUrl";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CloseOutlined } from "@mui/icons-material";
import Notification from "../components/Notification";

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
   const [isGeneratePdfPending, setIsGeneratePdfPending] = useState(false);
   const [isGenerateExcelPending, setIsGenerateExcelPending] = useState(false);
   const { currentAdmin } = useContext(LoginContext);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [exportDownloadConfirm, setExportDownloadConfirm] = useState("");

   const [message, setMessage] = useState("");
   const [showMessage, setShowMessage] = useState(false);
   const [messageSeverity, setMessageSeverity] = useState("warning");

   const {
      data: boardinghouses,
      isPending,
      error,
   } = useFetch(`${domain}/api/boarding-houses/export`);

   const createPdf = async (boardinghouses) => {
      setIsGeneratePdfPending(true);
      fetch(`${domain}/api/admin/validate-export`, {
         method: "POST",
         body: JSON.stringify({
            password: exportDownloadConfirm,
            admin: currentAdmin.username,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (!data.isValid) {
               setMessage("Password is incorrect.");
               setMessageSeverity("error");
               setShowMessage(true);
               console.log("Wrong password.");
               setIsGeneratePdfPending(false);
            } else {
               console.log("Downloading");
               fetch(`${domain}/api/pdf/generate`, {
                  method: "POST",
                  body: JSON.stringify(boardinghouses),
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
                     setIsGeneratePdfPending(false);
                     setExportDownloadConfirm("");
                  })
                  .catch((err) => console.log(err));
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const createExcel = async (boardinghouses) => {
      setIsGenerateExcelPending(true);
      fetch(`${domain}/api/admin/validate-export`, {
         method: "POST",
         body: JSON.stringify({
            password: exportDownloadConfirm,
            admin: currentAdmin.username,
         }),
         headers: {
            "Content-Type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (!data.isValid) {
               setMessage("Password is incorrect.");
               setMessageSeverity("error");
               setShowMessage(true);
               console.log("Wrong password.");
               setIsGenerateExcelPending(false);
            } else {
               console.log("Downloading...");
               fetch(`${domain}/api/excel/generate`, {
                  method: "POST",
                  body: JSON.stringify(boardinghouses),
                  headers: {
                     "Content-Type": "application/json",
                  },
               })
                  .then(() =>
                     axios.get(`${domain}/api/excel/download`, {
                        responseType: "blob",
                     })
                  )
                  .then((res) => {
                     const excelBlob = new Blob([res.data], {
                        type: "application/xlsx",
                     });
                     saveAs(excelBlob, "uep-registered-boardinghouse.xlsx");
                     setIsGenerateExcelPending(false);
                     setExportDownloadConfirm("");
                  })
                  .catch((err) => console.log(err));
            }
         })
         .catch((err) => console.log(err));
   };

   const handleModalClose = () => {
      setIsModalOpen(false);
   };

   return (
      <Container disableGutters maxWidth="xl" sx={{ minHeight: "100vh" }}>
         <HomeNavigation
            title="Export"
            handleDrawerToggle={handleDrawerToggle}
         />
         <Box className={classes.mainContent}>
            <Box p={2} style={{ height: "85%" }} className={classes.content}>
               <Notification
                  message={message}
                  setShowMessage={setShowMessage}
                  messageSeverity={messageSeverity}
                  showMessage={showMessage}
               />
               {error && <Typography>{error}</Typography>}
               {isPending && <LoadingState />}
               {boardinghouses && (
                  <>
                     <Modal
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                           timeout: 500,
                        }}
                        open={isModalOpen}
                        onClose={handleModalClose}
                     >
                        <Fade in={isModalOpen}>
                           <Container
                              maxWidth="xl"
                              disableGutters
                              sx={{
                                 display: "flex",
                                 justifyContent: "center",
                                 alignItems: "center",
                                 height: "100%",
                                 mt: -7,
                                 px: 2,
                              }}
                           >
                              <Box
                                 sx={{
                                    zIndex: 100,
                                    width: 400,
                                    bgcolor: "background.paper",
                                    borderRadius: ".5rem",
                                    boxShadow: 10,
                                    p: 2,
                                    py: 2,
                                    height: "max-content",
                                    flexDirection: "column",
                                    display: "flex",
                                 }}
                              >
                                 <CloseOutlined
                                    sx={{ alignSelf: "flex-end" }}
                                    onClick={handleModalClose}
                                    color="warning"
                                 />

                                 <Box
                                    sx={{
                                       display: "flex",
                                       flexDirection: "column",
                                       alignItems: "center",
                                       gap: 1,
                                    }}
                                 >
                                    <FileDownloadIcon
                                       sx={{
                                          height: "3rem",
                                          width: "3rem",
                                          color: red[500],
                                       }}
                                    />
                                    <Typography
                                       variant="h6"
                                       align="center"
                                       sx={{
                                          textTransform: "uppercase",
                                          fontFamily: "Quicksand",
                                          mb: 1,
                                          fontWeight: "bold",
                                       }}
                                       component="p"
                                    >
                                       Export
                                    </Typography>
                                 </Box>
                                 <Divider
                                    sx={{
                                       mb: 1,
                                    }}
                                 />
                                 <Typography variant="caption">
                                    Enter your password to export file.
                                 </Typography>
                                 <TextField
                                    size="small"
                                    color="primary"
                                    value={exportDownloadConfirm}
                                    onChange={(e) =>
                                       setExportDownloadConfirm(e.target.value)
                                    }
                                    autoFocus
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                 />

                                 <Box
                                    sx={{
                                       display: "flex",
                                       gap: 1,
                                       justifyContent: "center",
                                    }}
                                 >
                                    <LoadingButton
                                       variant="contained"
                                       color="secondary"
                                       startIcon={<PictureAsPdfIcon />}
                                       onClick={() => createPdf(boardinghouses)}
                                       loading={isGeneratePdfPending}
                                       disabled={exportDownloadConfirm === ""}
                                       fullWidth
                                    >
                                       Download as PDF
                                    </LoadingButton>

                                    <LoadingButton
                                       variant="contained"
                                       color="primary"
                                       startIcon={<ArticleIcon />}
                                       onClick={() =>
                                          createExcel(boardinghouses)
                                       }
                                       loading={isGenerateExcelPending}
                                       disabled={exportDownloadConfirm === ""}
                                       fullWidth
                                    >
                                       Download as Excel
                                    </LoadingButton>
                                 </Box>
                              </Box>
                           </Container>
                        </Fade>
                     </Modal>

                     <BoardingHouseTable data={boardinghouses} />
                     <Box
                        sx={{
                           alignSelf: "flex-end",
                           display: "flex",
                           gap: 1,
                           mt: 1,
                           flexWrap: "wrap",
                        }}
                     >
                        <Button
                           variant="contained"
                           color="secondary"
                           endIcon={<FileDownloadIcon />}
                           onClick={() => setIsModalOpen(true)}
                        >
                           Export as
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
