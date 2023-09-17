import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const activityWisePipApi = createApi({
  reducerPath: "activityWisePipApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    activityWisePipList: builder.query({
      query: () => `api/activitywisepip`,
      providesTags: [`activitywisepip`],
    }),
    AddActivityWisePip: builder.mutation({
      query: (data) => ({
        url: `api/activitywisepip`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activitywisepip"],
    }),
  }),
});
export const { useActivityWisePipListQuery, useAddActivityWisePipMutation } =
  activityWisePipApi;
