import { GET_USER_DETAIL } from "../../endPoints";
import { baseApi } from "../baseApi";

export const getUserDetailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetail: builder.query({
      query: () => ({
        url: GET_USER_DETAIL, // API endpoint
        method: "GET",
      }),
      providesTags: ["getUserDetail"],
    }),
  }),
});

export const { useGetUserDetailQuery } = getUserDetailApi;