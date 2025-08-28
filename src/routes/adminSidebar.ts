
import Profile from "@/pages/Admin/Profile";
import type { ISideBarItem } from "@/types";
import { lazy } from "react";

const Analytics =lazy(() => import("@/pages/Admin/Analytics"))
const AllParcels =lazy(() => import("@/pages/Admin/AllParcels"))
const AllUsers =lazy(() => import("@/pages/Admin/AllUsers"))


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