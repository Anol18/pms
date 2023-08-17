import { configureStore } from "@reduxjs/toolkit";

import { ProjectApi } from "./api/apiSlices/projectApi/projectSlice";

import projectSlice from "./features/ProjectSlice";
import { OutcomeApi } from "./api/apiSlices/outcome.slice";

const store = configureStore({
  reducer: {
    [ProjectApi.reducerPath]: ProjectApi.reducer,
    [OutcomeApi.reducerPath]: OutcomeApi.reducer,
    // redux Slice
    projectSlice: projectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ProjectApi.middleware)
      .concat(OutcomeApi.middleware),
});
// setupListeners(store.dispatch);
export default store;
