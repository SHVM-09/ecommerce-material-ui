import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h6">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "white" }}
              >
                Products
              </Link>
            </Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="cart"
            component={Link}
            to="/cart"
          >
            <Badge
              badgeContent={cartItems.reduce(
                (total, item) => total + item.quantity,
                0
              )}
              color="error"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
