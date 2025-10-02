import { SideBarNavMenuItemsProps } from "@/interfaces/components/globals/sidebars/side-bar-nav-menu.interface";
import {
  LayoutDashboardIcon,
} from "lucide-react";

export const SideBarNavMenuItems: SideBarNavMenuItemsProps = {
  ADMIN: [
    {
      label: "Dashboard",
      menus: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboardIcon,
        },
      ],
    },
  ],
};
