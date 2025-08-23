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
        
        myParcels: builder.query({
            query: () =>({
                url: "/parcels/me",
                method: "GET"
            }),
            
        }),
    })
})



export const { useAddParcelMutation, useMyParcelsQuery } = parcelApi