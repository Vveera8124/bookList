import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slice/bookSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
