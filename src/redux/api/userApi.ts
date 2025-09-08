import type { ProfileResponse } from "@/types/user.type";
import { baseApi } from "./baseApi";
import type { GetAllUserParams, UsersResponse } from "@/types/admin.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetMyProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    UpdateMyProfile: builder.mutation<ProfileResponse, Record<string, string>>({
      query: (payload) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    UpdateMyProfilePhoto: builder.mutation<ProfileResponse, FormData>({
      query: (formData) => ({
        url: "/user/update-profile-image",
        method: "PATCH",
        file: formData, // The FormData object
      }),
      invalidatesTags: ["User"],
    }),
    getAllUser: builder.query<UsersResponse, GetAllUserParams>({
      query: (params) => ({
        url: "/user/all-users",
        method: "GET",
        params,
      }),
    }),

  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateMyProfilePhotoMutation,
  useLazyGetAllUserQuery
} = userApi;
