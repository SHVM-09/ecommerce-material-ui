import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardActionArea
        component={Link}
        to={`/products/${product.id}`} // Link to product detail page
      >
        <CardMedia
          component="img"
          height="140"
          image={product.thumbnail}
          alt={product.title}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ padding: 2 }}>
        <Button
          variant="outlined" // Outline style button
          color="primary"
          onClick={handleAddToCart}
          sx={{ width: "100%" }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
