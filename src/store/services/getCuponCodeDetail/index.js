import { GET_CUPON_DETAIL } from "../../endPoints";
import { baseApi } from "../baseApi";

export const getCuponDetail = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCuponData: builder.mutation({
      query: (data) => {
        return({
        url: GET_CUPON_DETAIL, // API endpoint
        method: "POST",
        body: data,
      })},
      providesTags: ["getCuponDetail"],
    }),
  }),
});

export const { useGetCuponDataMutation } = getCuponDetail;
