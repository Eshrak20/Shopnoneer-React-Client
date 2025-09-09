/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  Project,
  ProjectsResponse,
  SingleProjectResponse,
  UpdateUserRoleApiResponse,
  UsersResponse,
} from "@/types/admin.type";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<UsersResponse, { searchTerm?: string } | void>({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    getAllProject: builder.query<ProjectsResponse, Record<string, any> | void>({
      query: (filters) => ({
        url: "/project/get-all-projects",
        method: "GET",
        params: filters ?? undefined, // convert void to undefined
      }),
      providesTags: ["Admin"],
    }),

    getSingleProject: builder.query<SingleProjectResponse, string>({
      query: (id) => ({
        url: `/project/get-single-project/${id}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),



    updateUserRoleStatus: builder.mutation<UpdateUserRoleApiResponse, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),


    createProject: builder.mutation<{ message: string }, Project>({
      query: (ProjectData) => ({
        url: "/project/create-project",
        method: "POST",
        body: ProjectData,
      }),
      invalidatesTags: ["Admin"],
    }),

  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserRoleStatusMutation,
  useCreateProjectMutation,
  useGetAllProjectQuery,
  useGetSingleProjectQuery
} = adminApi;
