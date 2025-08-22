
import { role } from "@/constants/role";
import { adminSidebar } from "@/routes/adminSidebar";
import { receiverSidebar } from "@/routes/receiverSidebar";
import { senderSidebar } from "@/routes/senderSidebar";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) =>{
    switch(userRole){
        case role.SUPER_ADMIN:
            return [...adminSidebar]
            case role.ADMIN:
                return [...adminSidebar]
        case role.SENDER:
            return [...senderSidebar]
        case role.RECEIVER:
            return [...receiverSidebar]
        default:
            return []
    }
}