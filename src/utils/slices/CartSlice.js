import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserCart, getProfilecart } from "../../service/CartService";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
};

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (user_id, thunkAPI) => {
    try {
      const data = await getProfilecart(user_id);
      const newData = data?.map((items) => {
        return {
          ...items.product,
          quantity: items.quantity,
        };
      });
      return newData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cart = state.cartItems;
      const findDuplicate = cart?.find(
        (items) => items.id === action.payload.data.id
      );
      if (!findDuplicate) {
        state.cartItems = [...cart, { ...action.payload.data, quantity: 1 }];
      } else {
        state.cartItems = cart?.map((item) =>
          item.id === action.payload.data.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }
      const session_token = sessionStorage.getItem("session_token");
      if (session_token) {
        addUserCart({ data: state.cartItems, id: action.payload.id });
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch cart";
      });
  },
});

export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
