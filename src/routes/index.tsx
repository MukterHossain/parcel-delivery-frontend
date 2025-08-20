import App from "@/App";
import About from "@/components/modules/about/about";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            // {
            //     path: '/',
            //     Component: App
            // },
            {
                path: '/about',
                Component: About
            },
        ]
    }
])