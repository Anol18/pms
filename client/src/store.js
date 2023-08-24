import { configureStore } from "@reduxjs/toolkit";

import { ProjectApi } from "./api/apiSlices/projectApi/projectSlice";

import projectSlice from "./features/ProjectSlice";
import { OutcomeApi } from "./api/apiSlices/outcome.slice";
import { ActivityApi } from "./api/apiSlices/activity.api.slice";
import { budgetDescription } from "./api/apiSlices/budgetDescription.api.slice";
import { detailBudgetApi } from "./api/apiSlices/detailBudget.api.slice";

const store = configureStore({
  reducer: {
    [ProjectApi.reducerPath]: ProjectApi.reducer,
    [OutcomeApi.reducerPath]: OutcomeApi.reducer,
    [ActivityApi.reducerPath]: ActivityApi.reducer,
    [budgetDescription.reducerPath]: budgetDescription.reducer,
    [detailBudgetApi.reducerPath]: detailBudgetApi.reducer,
    // redux Slice
    projectSlice: projectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ProjectApi.middleware)
      .concat(OutcomeApi.middleware)
      .concat(ActivityApi.middleware)
      .concat(budgetDescription.middleware)
      .concat(detailBudgetApi.middleware),
});
// setupListeners(store.dispatch);
export default store;
