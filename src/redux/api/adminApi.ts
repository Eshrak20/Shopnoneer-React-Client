/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  UpdateUserRoleApiResponse,
  UsersResponse,
} from "@/types/admin.type";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // redux/api/userApi.ts
    getAllUser: builder.query<UsersResponse, { searchTerm?: string } | void>({
      query: () => ({
        url: "/user/all-users",
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

  }),
});

export const {
  useGetAllUserQuery,
  useUpdateUserRoleStatusMutation,
} = adminApi;
