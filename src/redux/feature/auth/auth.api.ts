import { baseApi } from "@/redux/baseApi";
import type { ILogin, IResponse, ISendOtp, IVerifyOtp, } from "@/types";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation<IResponse<null>, ILogin>({
            query: (userInfo) =>({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["USER"],            
        }),
        logout: builder.mutation({
            query: () =>({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"],
        }),
        register: builder.mutation({
            query: (userInfo) =>({
                url: "/user/register",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["USER"],
        }),
        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userInfo) =>({
                url: "/otp/send",
                method: "POST",
                data: userInfo,
            }),
            invalidatesTags: ["USER"],
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query: (userInfo) =>({
                url: "/otp/verify",
                method: "POST",
                data: userInfo,
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



export const {useRegisterMutation, useSendOtpMutation, useVerifyOtpMutation, useLoginMutation,  useUserInfoQuery, useLogoutMutation} = authApi