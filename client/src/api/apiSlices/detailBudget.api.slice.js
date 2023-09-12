import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const detailBudgetApi = createApi({
  reducerPath: "detailBudgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    detailBudgetList: builder.query({
      query: () => `api/detailsbudget`,
      providesTags: [`detailBudget`],
    }),
    getTotalDetailBudgetList: builder.query({
      query: () => `api/totaldetailsbudget`,
      providesTags: [`detailBudget`],
    }),
    addDetailBudget: builder.mutation({
      query: (data) => ({
        url: `api/detailsbudget`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["detailBudget"],
    }),
  }),
});
export const {
  useDetailBudgetListQuery,
  useAddDetailBudgetMutation,
  useGetTotalDetailBudgetListQuery,
} = detailBudgetApi;
