import { baseApi } from "@/redux/baseApi";
import type {  IParcelPackage } from "@/types";


export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        addParcel: builder.mutation<null, Partial<IParcelPackage>>({
            query: (parceInfo) =>({
                url: "/parcels",
                method: "POST",
                data: parceInfo,
            }),
            invalidatesTags: ["PARCEL"],
        }),
        cancelParcel: builder.mutation({
            query: ({id, status}) =>({
                url: `/parcels/cancel/${id}`,
                method: "PATCH",
                data:{ status},
            }),
            invalidatesTags: ["PARCEL"],
        }),
        statusLogs: builder.query({
            query: (id) =>({
                url: `/parcels/${id}/status-log`,
                method: "GET",
            }),
        }),
        
    })
})



export const { useAddParcelMutation, useStatusLogsQuery, useCancelParcelMutation,  } = adminApi