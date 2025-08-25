import DeliveryHistory from "@/pages/Receiver/DeliveryHistory";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import ReceiverProfile from "@/pages/Receiver/ReceiverProfile";



export const receiverSidebar= [
    {
        title: "🏠 Receiver Dashboard",
        items: [
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
