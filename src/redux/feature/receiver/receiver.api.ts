import { baseApi } from "@/redux/baseApi";
// import type {  IParcelPackage } from "@/types";


export const receiverApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        incomingParcel: builder.query({
            query: () =>({
                url: "/parcels/incoming",
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),
        confirmDelivery: builder.mutation({
            query: ({id}) =>({
                url: `/parcels/confirm-delivery/${id}`,
                method: "PATCH",
                // data:{ status},
            }),
            invalidatesTags: ["PARCEL"],
        }),
         receiverAnalytics: builder.query({
            query: () =>({
                url: `/parcels/analytics`,
                method: "GET",
            }),
            providesTags: ["PARCEL"],
        }),
        deliveryHistory: builder.query({
            query: () =>({
                url: `/parcels/delivery-history`,
                method: "GET",
            }),
        }),
        receiverStatusLogs: builder.query({
            query: (id) =>({
                url: `/parcels/${id}/status-log`,
                method: "GET",
            }),
        }),

        
    })
})



export const { useConfirmDeliveryMutation,useDeliveryHistoryQuery,useIncomingParcelQuery, useReceiverAnalyticsQuery } = receiverApi