import App from "@/App";
import About from "@/components/modules/about/About";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index:true,
                Component: HomePage
            },
            {
                path: '/about',
                Component: About
            },
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
])