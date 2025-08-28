import { COUPON_CODE_SCAN } from "../../endPoints";
import { baseApi } from "../baseApi";

export const couponCodeScan = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    couponCodeScan: builder.mutation({
      query: (data) => {
        return({
        url: COUPON_CODE_SCAN, // API endpoint
        method: "POST",
        body: data,
      })},
      providesTags: ["couponCodeScan"],
    }),
  }),
});

export const { useCouponCodeScanMutation } = couponCodeScan;