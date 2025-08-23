import AddParcel from "@/pages/Sender/AddParcel";
import SenderAnalytics from "@/pages/Sender/SenderAnalytics";
import SenderProfile from "@/pages/Sender/SenderProfile";


export const senderSidebar = [
    {
        title: "Sender Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/sender/analytics",
                component: SenderAnalytics
            },
            {
                title: "Add Parcel",
                url: "/sender/add-parcel",
                component: AddParcel
            },
            {
                title: "Profile",
                url: "/sender/profile",
                component: SenderProfile
            },
        ],
    }
]