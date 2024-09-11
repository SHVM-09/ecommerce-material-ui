import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // Adjust the path as needed
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Container,
  Grid,
} from "@mui/material";

const ProductDetailPage = ({ products }) => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) return <Typography variant="h6">Product not found</Typography>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Container sx={{ paddingY: 4, marginTop: 12 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            height="400"
            image={product.thumbnail}
            alt={product.title}
            sx={{ borderRadius: 1, objectFit: "contain", boxShadow: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Price: ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              sx={{ marginTop: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
