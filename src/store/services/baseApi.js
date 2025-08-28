import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../api/api";
const baseQuery = fetchBaseQuery({
  baseUrl: api,
  prepareHeaders: (headers, { getState }) => {
    const token = JSON.parse(localStorage.getItem('userToken') || 'null');
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["user", "product", "getUserDetail","getCuponDetail","getscanningHistory"],
});
