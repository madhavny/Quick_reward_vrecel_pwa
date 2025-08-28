import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../../../api/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    sendOTP: builder.mutation({
      query: (data) => ({
        url: "requestOtp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "verifyOtp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "registerUser",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    userLogout: builder.mutation({
      query: (data) => ({
        url: "/users/logout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
     pincodeDetails: builder.mutation({
      query: (data) => ({
        url: "getPincodeDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useRegisterUserMutation,
  useUserLogoutMutation,
  usePincodeDetailsMutation,

} = authApi;
