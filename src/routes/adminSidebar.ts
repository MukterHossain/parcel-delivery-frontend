import AllParcels from "@/pages/Admin/AllParcels";
import AllUsers from "@/pages/Admin/AllUsers";
import Analytics from "@/pages/Admin/Analytics";
import Profile from "@/pages/Admin/Profile";
import type { ISideBarItem } from "@/types";

export const adminSidebar: ISideBarItem[] = [
    {
      title: "🏠 Admin Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: Analytics
        },
        {
          title: "All Parcels",
          url: "/admin/all-parcels",
          component: AllParcels
        },
        {
          title: "All Users",
          url: "/admin/all-users",
          component: AllUsers
        },
        {
          title: "Profile",
          url: "/admin/profile",
          component: Profile
        },
      ],
    },
    
    
  ]