import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com/products?limit=100";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    categories: [], // New state property for categories
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    filterByTitleAndCategory(state, action) {
      const { searchTerm, category } = action.payload;
      state.filteredItems = state.items.filter(
        (product) =>
          (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (category
            ? product.category.toLowerCase() === category.toLowerCase()
            : true)
      );
    },
    sortByPrice(state, action) {
      const { order } = action.payload;
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      );
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
        // Extract and set unique categories
        const uniqueCategories = [
          ...new Set(action.payload.map((product) => product.category)),
        ];
        state.categories = uniqueCategories;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterByTitleAndCategory, sortByPrice, setCategories } =
  productSlice.actions;

export default productSlice.reducer;
