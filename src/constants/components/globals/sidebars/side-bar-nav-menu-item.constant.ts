import { SideBarNavMenuItemsProps } from "@/interfaces/components/globals/sidebars/side-bar-nav-menu.interface";
import { LayoutDashboardIcon, Ship, TicketCheck, House } from "lucide-react";

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
        {
          title: "Jalur Desa",
          url: "/admin/jalur",
          icon: Ship,
        },
        {
          title: "Acara",
          url: "/admin/event",
          icon: TicketCheck,
        },
        {
          title: "Penginapan",
          url: "/admin/penginapan",
          icon: House,
        },
      ],
    },
  ],
};
