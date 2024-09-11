import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import FilterSort from "./filterSort";
import { fetchProducts } from "../redux/productSlice";
import { Box, Container } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const { filteredItems, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: 2,
        marginTop: 8,
      }}
    >
      <Container maxWidth="lg">
        <FilterSort />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(250px, 1fr))",
              sm: "repeat(auto-fill, minmax(300px, 1fr))",
            },
            gap: 2,
            marginTop: 2,
          }}
        >
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProductList;
