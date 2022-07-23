import { configureStore } from "@reduxjs/toolkit";
import search from "./search";
import modalStatus from "./modalStatus";
const store = configureStore({
  reducer: {
    search,
    modalStatus,
  },
});

export default store;
