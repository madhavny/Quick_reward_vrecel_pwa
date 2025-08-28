import { GET_SCANNING_LIST } from "../../endPoints";
import { baseApi } from "../baseApi";

export const getScanningHistory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getscanningHistory: builder.query({
      query: () => ({
        url: GET_SCANNING_LIST, // API endpoint
        method: "GET",
      }),
      providesTags: ["getscanningHistory"],
    }),
  }),
});

export const { useGetscanningHistoryQuery } = getScanningHistory;