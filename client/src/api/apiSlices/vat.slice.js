import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../baseUrl";

export const vatApi = createApi({
  reducerPath: "vatApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    vatList: builder.query({
      query: () => `api/vat`,
      providesTags: [`vat`],
    }),
    addVat: builder.mutation({
      query: (data) => ({
        url: `api/vat`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vat"],
    }),
  }),
});
export const { useVatListQuery, useAddVatMutation } = vatApi;
