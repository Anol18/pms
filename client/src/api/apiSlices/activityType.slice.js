import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const activityTypeApi = createApi({
  reducerPath: "activityTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    activityTypeList: builder.query({
      query: () => `api/activitytype`,
      providesTags: [`activitytype`],
    }),
    addActivityType: builder.mutation({
      query: (data) => ({
        url: `api/activitytype`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activitytype"],
    }),
  }),
});
export const { useActivityTypeListQuery, useAddActivityTypeMutation } =
  activityTypeApi;
