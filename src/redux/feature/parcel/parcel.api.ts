import { baseApi } from "@/redux/baseApi";
import type { ILogin } from "@/types";


export const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation<null, ILogin>({
            query: (userInfo) =>({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            })
        }),
        logout: builder.mutation({
            query: () =>({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"],
        }),
        
        userInfo: builder.query({
            query: () =>({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ["USER"],
        }),
    })
})



export const { useLoginMutation,  useUserInfoQuery, useLogoutMutation} = parcelApi