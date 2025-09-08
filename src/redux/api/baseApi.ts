import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/s1",
    // baseUrl: "https://shopnoneer-express-js.vercel.app/api/s1",

    credentials: "include",
  }),
  tagTypes: ["Admin","User","Agent","Auth","Address"],
  endpoints: () => ({}),
});
