import Analytics from "@/pages/Admin/Analytics";
import Profile from "@/pages/Admin/Profile";

export const adminSidebar = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: Analytics
        },
      ],
    },
    {
      title: "Parcel Management",
      items: [
        {
          title: "Admin Profile",
          url: "/admin/profile",
          component: Profile
        },
      ],
    },
    
  ]