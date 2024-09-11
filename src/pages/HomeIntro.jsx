import { Box, Typography, Container } from "@mui/material";

const HomeIntro = () => {
  return (
    <Container>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Our E-commerce Store
        </Typography>
        <Typography variant="body1">
          Here, you will find a wide range of products to choose from. Browse
          through our categories and enjoy shopping with us.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomeIntro;
