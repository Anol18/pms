import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import api from "../../baseUrl";
export const ProjectApi = createApi({
  reducerPath: "ProjectApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    projectList: builder.query({
      query: () => `api/project`,
      providesTags: [`project`],
      // invalidatesTags: [`projectlist`],
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: `api/project`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const { useProjectListQuery, useAddProjectMutation } = ProjectApi;
