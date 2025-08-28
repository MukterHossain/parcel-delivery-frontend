
import ReceiverProfile from "@/pages/Receiver/ReceiverProfile";
import { lazy } from "react";

const ReceiverAnalytics =lazy(() => import("@/pages/Receiver/ReceiverAnalytics"))
const DeliveryHistory =lazy(() => import("@/pages/Receiver/DeliveryHistory"))
const IncomingParcels =lazy(() => import("@/pages/Receiver/IncomingParcels"))




export const receiverSidebar= [
    {
        title: "🏠 Receiver Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/receiver/Analytics",
                component: ReceiverAnalytics
            },
            {
                title: "Incoming Parcels",
                url: "/receiver/incoming-parcels",
                component: IncomingParcels
            },
            {
                title: "History",
                url: "/receiver/history",
                component: DeliveryHistory
            },
            {
                title: "Profile",
                url: "/receiver/profile",
                component: ReceiverProfile
            },
        ],
    }
]
