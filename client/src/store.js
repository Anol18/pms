import { configureStore } from "@reduxjs/toolkit";

import { ProjectApi } from "./api/apiSlices/projectApi/projectSlice";

import projectSlice from "./features/ProjectSlice";
import { OutcomeApi } from "./api/apiSlices/outcome.slice";
import { ActivityApi } from "./api/apiSlices/activity.api.slice";

import { detailBudgetApi } from "./api/apiSlices/detailBudget.api.slice";
import { particular } from "./api/apiSlices/particular.api";

const store = configureStore({
  reducer: {
    [ProjectApi.reducerPath]: ProjectApi.reducer,
    [OutcomeApi.reducerPath]: OutcomeApi.reducer,
    [ActivityApi.reducerPath]: ActivityApi.reducer,
    [particular.reducerPath]: particular.reducer,
    [detailBudgetApi.reducerPath]: detailBudgetApi.reducer,
    // redux Slice
    projectSlice: projectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ProjectApi.middleware)
      .concat(OutcomeApi.middleware)
      .concat(ActivityApi.middleware)
      .concat(particular.middleware)
      .concat(detailBudgetApi.middleware),
});
// setupListeners(store.dispatch);
export default store;
