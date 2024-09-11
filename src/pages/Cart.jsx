import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../redux/cartSlice";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Avatar,
  Grid,
  Container,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Paginate items
  const paginatedItems = cartItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container>
      <Box sx={{ padding: 2, backgroundColor: grey[200], marginTop: 12 }}>
        <Typography variant="h4" gutterBottom sx={{ color: blue[800] }}>
          Shopping Cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography>No items in the cart</Typography>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: grey[100] }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {/* Use thumbnail for image display */}
                        <Avatar
                          src={
                            item.thumbnail || "https://via.placeholder.com/60"
                          }
                          alt={item.title}
                          variant="square"
                          sx={{ width: 60, height: 60 }}
                        />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Grid container spacing={1} alignItems="center">
                          <Grid item>
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ minWidth: 30, fontSize: "1rem" }}
                              onClick={() => handleDecrement(item.id)}
                            >
                              -
                            </Button>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1">
                              {item.quantity}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{ minWidth: 30, fontSize: "1rem" }}
                              onClick={() => handleIncrement(item.id)}
                            >
                              +
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ minWidth: "auto", padding: "6px 12px" }}
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={cartItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: grey[300] }}
              />
            </TableContainer>
            <Box
              sx={{
                marginTop: 2,
                backgroundColor: grey[100],
                padding: 2,
                borderRadius: 1,
              }}
            >
              <Typography variant="h6" sx={{ color: blue[800] }}>
                Total: ${getTotalPrice()}
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    href="/checkout"
                    sx={{ padding: "10px 20px" }}
                  >
                    Proceed to Checkout
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearCart}
                    sx={{ padding: "10px 20px" }}
                  >
                    Clear Cart
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
