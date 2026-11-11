import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import detailsReducer from "./detailsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    details: detailsReducer,
  },
});
