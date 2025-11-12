import { createSlice } from "@reduxjs/toolkit";
const savedProducts = JSON.parse(localStorage.getItem("products"));
const savedCategories = JSON.parse(localStorage.getItem("categories"));

const initialState = {
  products: savedProducts || [],
  product: [],
  filteredProducts: savedProducts || [],
  categories: savedCategories || [],
  selectedCategory: "all",
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
      state.filteredProducts = action.payload; // Default show all products
      localStorage.setItem("products",JSON.stringify(action.payload)); // store the data that we get from the api
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSingleProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    fetchSingleProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
      localStorage.setItem("categories",JSON.stringify(action.payload));
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      if (action.payload === "all") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (item) => item.category === action.payload
        );
      }
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchSingleProductsStart,
  fetchSingleProductSuccess,
  fetchSingleProductsFailure,
  setSelectedCategory,
  setCategories,
} = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());

    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.toString()));
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch(fetchSingleProductsStart());
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    dispatch(fetchSingleProductSuccess(data));
  } catch (error) {
    dispatch(fetchSingleProductsFailure(error.toString()));
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();

    dispatch(setCategories(["all", ...data])); // include "all" option
  } catch (error) {
    console.error("Category fetch failed:", error);
  }
};

export default productSlice.reducer;
