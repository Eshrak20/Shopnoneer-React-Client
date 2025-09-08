/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AllHousing, DDUpazila } from "@/types/address.type";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivision: builder.query<DDUpazila, { searchTerm?: string } | void>({
      query: () => ({
        url: "/div/get-all-division",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    getAllDistrict: builder.query<DDUpazila, { searchTerm?: string } | void>({
      query: () => ({
        url: "/dist/get-all-district",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    getAllUpazila: builder.query<DDUpazila, { searchTerm?: string } | void>({
      query: () => ({
        url: "/upazila/get-all-upazila",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    getAllHousing: builder.query<AllHousing, { searchTerm?: string } | void>({
      query: () => ({
        url: "/housing/get-all-housing",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAllDivisionQuery,
  useGetAllDistrictQuery,
  useGetAllUpazilaQuery,
  useGetAllHousingQuery
} = adminApi;
