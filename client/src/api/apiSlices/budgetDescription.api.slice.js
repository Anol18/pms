import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const budgetDescription = createApi({
  reducerPath: "budgetDescription",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    budgetDescriptionList: builder.query({
      query: () => `api/budgetDescription`,
      providesTags: [`budgetDescription`],
    }),
    addBudgetDescription: builder.mutation({
      query: (data) => ({
        url: `api/budgetDescription`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["budgetDescription"],
    }),
  }),
});
export const {
  useBudgetDescriptionListQuery,
  useAddBudgetDescriptionMutation,
} = budgetDescription;
