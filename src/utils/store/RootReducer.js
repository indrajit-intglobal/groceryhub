import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import ProfileSlice from "../slices/ProfileSlice";
import GeneralSlice from "../slices/GeneralSlice";
import CartSlice from "../slices/CartSlice";

export const RootReducer = combineReducers({
  auth: AuthSlice,
  profile: ProfileSlice,
  general: GeneralSlice,
  cart: CartSlice,
});
