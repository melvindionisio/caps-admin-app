import { Container, Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import useFetch from "../hooks/useFetch";
import BoardingHouseTable from "../components/BoardingHouseTable";
import { grey } from "@mui/material/colors";
import HomeNavigation from "../components/HomeNavigation";

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
const Home = () => {
  const classes = useStyles();
  const {
    data: boardingHouses,
    isPending,
    error,
  } = useFetch(
    "https://my-json-server.typicode.com/melvindionisio/boardinghouse-serve/boardinghouses"
  );
  return (
    <Container disableGutters maxWidth="xl">
      <Box className={classes.mainContent} p={0}>
        <HomeNavigation title="Boarding Houses" />
        <Box p={2} style={{ height: "85%" }} className={classes.content}>
          {error && <Typography>{error}</Typography>}
          {isPending && <Typography>Loading</Typography>}
          {boardingHouses && <BoardingHouseTable data={boardingHouses} />}
          <Button
            variant="contained"
            color="primary"
            sx={{ alignSelf: "flex-end", mt: 1 }}
          >
            Add Boarding House
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
