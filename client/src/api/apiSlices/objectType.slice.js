import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import api from "../baseUrl";

export const objectTypeApi = createApi({
  reducerPath: "objectTypeApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    objectTypeList: builder.query({
      query: () => "api/objecttype",
      providesTags: ["objecttype"],
    }),
    addObjectType: builder.mutation({
      query: (data) => ({
        url: "api/objecttype",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["objecttype"],
    }),
  }),
});

export const { useAddObjectTypeMutation, useObjectTypeListQuery } =
  objectTypeApi;
