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
            query: () =>({
                url: `/parcels`,
                method: "GET",
            }),
        }),
        
    })
})



export const {  useAllParcelsQuery, useStatusUpdateMutation,useStatusBlockMutation } = adminApi