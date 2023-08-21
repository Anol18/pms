import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const ActivityApi = createApi({
  reducerPath: "ActivityApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    activityList: builder.query({
      query: () => `api/activity`,
      providesTags: [`activity`],
    }),
    addActivity: builder.mutation({
      query: (data) => ({
        url: `api/activity`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activity"],
    }),
  }),
});
export const { useActivityListQuery, useAddActivityMutation } = ActivityApi;
