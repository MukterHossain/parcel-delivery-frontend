import AddParcel from "@/pages/Sender/AddParcel";
import SenderProfile from "@/pages/Sender/SenderProfile";
import { lazy } from "react";

const AllParcel =lazy(() => import("@/pages/Sender/AllParcel"))
const SenderAnalytics =lazy(() => import("@/pages/Sender/SenderAnalytics"))


export const senderSidebar = [
    {
        title: "🏠 Sender Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/sender/analytic",
                component: SenderAnalytics
            },
            {
                title: "Add Parcel",
                url: "/sender/add-parcel",
                component: AddParcel
            },
            {
                title: "All Parcels",
                url: "/sender/all-parcels",
                component: AllParcel
            },
            {
                title: "Profile",
                url: "/sender/profile",
                component: SenderProfile
            },
        ],
    }
]