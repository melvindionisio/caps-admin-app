import React from "react";
import HomeNavigation from "../components/HomeNavigation";
import { Container, Typography, Box } from "@mui/material";

const Dashboard = ({ handleDrawerToggle }) => {
  return (
    <Container maxWidth="xl" disableGutters sx={{ minHeight: "100vh" }}>
      <HomeNavigation
        title="dashboard"
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="initial">
          Total Bording house, boarding house by brgy,
        </Typography>
        <Typography variant="h1" color="initial">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque eum
          aperiam consequuntur eaque alias perspiciatis odit. Consectetur
          perspiciatis amet aperiam voluptas, unde laborum placeat? Molestias
          sit necessitatibus perspiciatis corrupti magni! Quam molestias
          eligendi modi corporis praesentium minus ipsum expedita deleniti
          doloremque labore adipisci, reiciendis voluptate rerum eum debitis nam
          laudantium quaerat illum deserunt natus! Alias temporibus aliquid
          maxime odio adipisci? Inventore recusandae excepturi quod delectus
          porro ipsum culpa impedit voluptates molestias officia maiores,
          veritatis voluptatem ab fugit, enim consectetur pariatur laboriosam
          natus nesciunt rerum. Neque provident officiis eveniet repellat minus.
          Saepe quae velit eum temporibus ipsa, in non corrupti magni illo ut
          nemo impedit atque praesentium placeat dolorem, veniam eveniet
          deleniti recusandae. Natus non cumque eius, beatae autem explicabo
          ducimus! Aspernatur esse molestias porro tempore fugit, incidunt quas
          expedita corrupti, quisquam, libero obcaecati odio harum ullam ea amet
          ut! Cum assumenda quisquam odit corporis temporibus porro fuga quas.
          Molestiae, ipsum?
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
