import AddParcel from "@/pages/Sender/AddParcel";
import AllParcel from "@/pages/Sender/AllParcel";
import SenderAnalytics from "@/pages/Sender/SenderAnalytics";
import SenderProfile from "@/pages/Sender/SenderProfile";


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