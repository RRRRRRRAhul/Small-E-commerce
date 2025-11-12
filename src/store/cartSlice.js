import { createSlice } from "@reduxjs/toolkit";

const getCartItems = JSON.parse(localStorage.getItem("cartItems"));
const getTotalQuantity = JSON.parse(localStorage.getItem("totalQuantity"));
const getTotalPrice = JSON.parse(localStorage.getItem("totalPrice"));

const initialState = {
  cartItems: getCartItems || [],
  totalQuantity: getTotalQuantity || 0,
  totalPrice: getTotalPrice || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // find the duplicate product
      const existingItem = state.cartItems.find(
        (item) => item.id == product.id
      );

      // change the state based on the existing products
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalQuantity',JSON.stringify(state.totalQuantity));
      localStorage.setItem('totalPrice',JSON.stringify(state.totalPrice));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const product = state.cartItems.find((item) => item.id == id);
      if (!product) {
        return;
      } else {
        state.totalQuantity -= product.quantity;
        state.totalPrice -= product.price * product.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      } else if (item && item.quantity === 1) {
        // If only 1 left → remove item entirely
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer =  cartSlice.reducer;
