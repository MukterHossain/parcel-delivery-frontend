import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/components/modules/about/About";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebar } from "./adminSidebar";
import { receiverSidebar } from "./receiverSidebar";
import { senderSidebar } from "./senderSidebar";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import Feature from "@/components/modules/feature/Feature";
import Contact from "@/components/modules/contact/Contact";
import ParcelTracking from "@/pages/Admin/ParcelTracking";
import Faq from "@/components/modules/faq/Faq";
import SenderParcelTracking from "@/pages/Sender/SenderParcelTraking";
import ErrorHandle from "@/error/ErrorHandle";
import PublicParcelTracking from "@/pages/PublicParcelTracking";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        errorElement: <ErrorHandle></ErrorHandle>,
        children: [
            {
                index:true,
                Component: HomePage
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/feature',
                Component: Feature
            },
            {
                path: '/track-parcel',
                Component: PublicParcelTracking
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/faq',
                Component: Faq
            },
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.ADMIN as TRole),
        children: [
            {
                index:true,
                element: <Navigate to="/admin/analytics"></Navigate>
            },
            ...generateRoutes(adminSidebar),
            {
                path: "/admin/parcel-tracking/:trackingId",
                Component: ParcelTracking
            }
        ]
    },
    {
        path: "/receiver",
        Component: withAuth(DashboardLayout, role.RECEIVER as TRole),
        children: [
            {
                index:true,
                element: <Navigate to="/receiver/Analytics"></Navigate>
            },
            ...generateRoutes(receiverSidebar)
        ]
    },
    {
        path: "/sender",
        Component: DashboardLayout,
        children: [
            {
                index:true,
                element: <Navigate to="/sender/analytic"></Navigate>
            },
            ...generateRoutes(senderSidebar),
            {
                path: "/sender/parcel-tracking/:trackingId",
                Component: SenderParcelTracking
            }
        ]
    },



      {
       path: "/login",
       Component: Login
    },
    {
       path: "/register",
       Component: Register
    },
     {
       path: "/verify",
       Component: Verify
    },
    {
       path: "/unauthorized",
       Component: Unauthorized
    },
])