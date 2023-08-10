import { configureStore } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ProjectApi } from "./api/apiSlices/projectApi/projectSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
  reducer: {
    [ProjectApi.reducerPath]: ProjectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProjectApi.middleware),
});
// setupListeners(store.dispatch);
export default store;
