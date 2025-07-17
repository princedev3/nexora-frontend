import { OrderType } from "@/components/type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://nexora-backend-phgo.onrender.com"}),
    endpoints:(builder) =>({
        register:builder.mutation({
            query:(user)=>({
                url:"/users/register",
                method:"POST",
                body:user
            })
        }),
        login:builder.mutation({
            query:(user)=>({
                url:"/users/login",
                method:"POST",
                body:user
            })
        }),
        createProduct:builder.mutation({
            query:(productDetails)=>({
                 url:"/product/create-product",
                 method:"POST",
                 body:productDetails
            })
        }),
        allProducts:builder.query({
            query:()=>({
                 url:"/product/get-all-products",
                 method:"GET",
            })
        }),
        categoryProducts:builder.query({
            query:(category)=>({
                 url:`/product/get-category-product?cat=${category}`,
                 method:"GET",
            })
        }),
        getSingleProducts:builder.query({
            query:(id)=>({
                 url:`/product/get-single-products/${id}`,
                 method:"GET",
            })
        }),
        getAllOrders:builder.query<{allOrders:OrderType[]},string>({
            query:(email)=>({
                 url:`/api/order/${email}`,
                 method:"GET",
            })
        }),
    } ),
})

export const {
 useRegisterMutation,
 useLoginMutation,
 useCreateProductMutation,
 useAllProductsQuery,
 useCategoryProductsQuery,
 useGetSingleProductsQuery,
 useGetAllOrdersQuery
} = userApi;