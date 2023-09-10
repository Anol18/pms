import { configureStore } from "@reduxjs/toolkit";

import { ProjectApi } from "./api/apiSlices/projectApi/projectSlice";

import projectSlice from "./features/ProjectSlice";
import { OutcomeApi } from "./api/apiSlices/outcome.slice";
import { ActivityApi } from "./api/apiSlices/activity.api.slice";

import { detailBudgetApi } from "./api/apiSlices/detailBudget.api.slice";
import { particular } from "./api/apiSlices/particular.api";
import { objectTypeApi } from "./api/apiSlices/objectType.slice";
import { activityTypeApi } from "./api/apiSlices/activityType.slice";
import { vatApi } from "./api/apiSlices/vat.slice";

const store = configureStore({
  reducer: {
    [ProjectApi.reducerPath]: ProjectApi.reducer,
    [OutcomeApi.reducerPath]: OutcomeApi.reducer,
    [ActivityApi.reducerPath]: ActivityApi.reducer,
    [particular.reducerPath]: particular.reducer,
    [detailBudgetApi.reducerPath]: detailBudgetApi.reducer,
    [objectTypeApi.reducerPath]: objectTypeApi.reducer,
    [activityTypeApi.reducerPath]: activityTypeApi.reducer,
    [vatApi.reducerPath]: vatApi.reducer,
    // redux Slice
    projectSlice: projectSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ProjectApi.middleware)
      .concat(OutcomeApi.middleware)
      .concat(ActivityApi.middleware)
      .concat(particular.middleware)
      .concat(objectTypeApi.middleware)
      .concat(activityTypeApi.middleware)
      .concat(vatApi.middleware)
      .concat(detailBudgetApi.middleware),
});
// setupListeners(store.dispatch);
export default store;
