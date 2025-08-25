import { baseApi } from "@/redux/baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        
        statusUpdate: builder.mutation({
            query: ({id, status}) =>({
                url: `/parcels/status-update/${id}`,
                method: "PATCH",
                data:{ status},
            }),
            invalidatesTags: ["PARCEL"],
        }),
        statusBlock: builder.mutation({
            query: ({id, status}) =>({
                url: `/parcels/block/${id}`,
                method: "PATCH",
                data:{ status},
            }),
            invalidatesTags: ["PARCEL"],
        }),
         allParcels: builder.query({
            query: ({page =1, limit = 10, status, searchTerm, sort }: {page?: number, limit?: number, status?: string, searchTerm?: string, sort?: string}) =>({
                url: `/parcels`,
                method: "GET",
                params: {page, limit, status, searchTerm, sort},
            }),
            providesTags: ["PARCEL"],
        }),
        adminAnalytics: builder.query({
            query: () =>({
                url: `/parcels/analytics`,
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),

        // User
        userBlock: builder.mutation({
            query: ({id, userInfo}) =>({
                url: `/user/block/${id}`,
                method: "PATCH",
                data:{ userInfo},
            }),
            invalidatesTags: ["PARCEL"],
        }),
        userUnblock: builder.mutation({
            query: ({id, userInfo}) =>({
                url: `/user/unblock/${id}`,
                method: "PATCH",
                data:{ userInfo},
            }),
            invalidatesTags: ["PARCEL"],
        }),
        allUsers: builder.query({
            query: () =>({
                url: `/user/all-users`,
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
       
        
    })
})



export const {  useAllParcelsQuery, useStatusUpdateMutation,useStatusBlockMutation, useAllUsersQuery , useAdminAnalyticsQuery, useUserBlockMutation, useUserUnblockMutation} = adminApi