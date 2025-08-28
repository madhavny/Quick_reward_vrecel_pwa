import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from '../../../api/api';

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: api,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({

        createProduct: builder.mutation({
            query: (data) => ({
                url: "/product/create_product",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Product"],
        }),

        getAllProducts: builder.query({
            query: () => "/product/getAll_product",
            providesTags: ["Product"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/delete_product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const { useCreateProductMutation,useGetAllProductsQuery ,useDeleteProductMutation} = productApi;
