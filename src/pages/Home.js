import { Container, Box } from "@mui/material";
import BoardingHouseCard from "../components/cards/BoardingHouseCard";

// import useFetch from "../hooks/useFetch";
import HomeNavigation from "../components/HomeNavigation";
// import LoadingState from "../components/LoadingState";

const Home = ({ handleDrawerToggle }) => {
  // const {
  //   data: boardingHouses,
  //   isPending,
  //   error,
  // } = useFetch(
  //   "https://my-json-server.typicode.com/melvindionisio/boardinghouse-serve/boardinghouses"
  // );
  return (
    <Container disableGutters maxWidth="xl" sx={{ minHeight: "100vh" }}>
      <HomeNavigation
        title="Boarding Houses"
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ px: 3, py: 3, pb: 5 }}>
        <BoardingHouseCard />
      </Box>
    </Container>
  );
};

export default Home;
