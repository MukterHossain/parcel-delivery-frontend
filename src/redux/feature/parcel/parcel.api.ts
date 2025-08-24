import { baseApi } from "@/redux/baseApi";
import type {  IParcelPackage } from "@/types";


export const parcelApi = baseApi.injectEndpoints({
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
        allReceivers: builder.query({
            query: () =>({
                url: "/user/receivers",
                method: "GET"
            }),           
        }),
        getSenderParcels: builder.query({
            query: () =>({
                url: "/parcels/me",
                method: "GET"
            }),  
             providesTags: ["PARCEL"],          
        }),
    })
})



export const { useAddParcelMutation, useStatusLogsQuery, useCancelParcelMutation, useGetSenderParcelsQuery, useAllReceiversQuery } = parcelApi