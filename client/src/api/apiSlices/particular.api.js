import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const particular = createApi({
  reducerPath: "particular",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    particularList: builder.query({
      query: () => `api/particular`,
      providesTags: [`particular`],
    }),
    addparticular: builder.mutation({
      query: (data) => ({
        url: `api/particular`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["particular"],
    }),
  }),
});
export const { useAddparticularMutation, useParticularListQuery } = particular;
