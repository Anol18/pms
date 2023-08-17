import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const OutcomeApi = createApi({
  reducerPath: "outcomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    outcomeList: builder.query({
      query: () => `api/outcome`,
      providesTags: [`outcome`],
    }),
    addOutcome: builder.mutation({
      query: (data) => ({
        url: `api/outcome`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["outcome"],
    }),
  }),
});
export const { useAddOutcomeMutation, useOutcomeListQuery } = OutcomeApi;
