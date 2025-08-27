import DeliveryHistory from "@/pages/Receiver/DeliveryHistory";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import ReceiverAnalytics from "@/pages/Receiver/ReceiverAnalytics";
import ReceiverProfile from "@/pages/Receiver/ReceiverProfile";



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
