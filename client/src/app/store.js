import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";

export const userStore = configureStore({
  reducer: {
    userReducer,
  },
});
