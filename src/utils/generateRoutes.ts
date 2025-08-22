import type { ISideBarItem } from "@/types"


export const generateRoutes = (sideBarItems: ISideBarItem[]) =>{
    return sideBarItems.flatMap((section) => section.items.map((route) =>({
        path: route.url,
        Component: route.component
    })))
}