import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const ActivityTotalApi = createApi({
  reducerPath: "ActivityTotalApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    activityTotalList: builder.query({
      query: () => `api/activitytotal`,
      providesTags: [`activitytotal`],
    }),
    addActivityTotal: builder.mutation({
      query: (data) => ({
        url: `api/activitytotal`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activitytotal"],
    }),
  }),
});
export const { useActivityTotalListQuery, useAddActivityTotalMutation } =
  ActivityTotalApi;
