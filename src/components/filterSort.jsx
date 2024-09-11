import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTitleAndCategory, sortByPrice } from "../redux/productSlice";
import {
  TextField,
  Button,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const FilterSort = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories); // Access categories from Redux store
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(
      filterByTitleAndCategory({
        searchTerm,
        category: category === "All" ? "" : category,
      })
    );
  }, [searchTerm, category, dispatch]);

  useEffect(() => {
    dispatch(sortByPrice({ order: sortOrder }));
  }, [sortOrder, dispatch]);

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="All">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterSort;
