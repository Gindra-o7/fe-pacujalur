import * as React from "react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

import { getUser, getToken, getRoles } from "@/helpers/auth.helper";

import { SideBarHeader } from "./side-bar-header";
import { SideBarFooter } from "./side-bar-footer";
import { SideBarNavMenu } from "./side-bar-nav-menu";
import { SideBarNavMenuItems } from "@/constants/components/globals/sidebars/side-bar-nav-menu-item.constant";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/helpers/global.helper";
import { UserProfileProps } from "@/interfaces/components/globals/sidebars/app-sidebar.interface";
import { SideBarNavMenuGroupProps } from "@/interfaces/components/globals/sidebars/side-bar-nav-menu.interface";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<UserProfileProps>({
    name: "Anonymous User",
    email: "unknown@unknown.com",
    avatar: "/avatars/shadcn.jpg",
  });
  const [roles, setRoles] = React.useState<string[]>([]);
  const [roleBasedSideBarNavMenuItems, setRoleBasedSideBarNavMenuItems] = React.useState<SideBarNavMenuGroupProps[]>([]);

  React.useEffect(() => {
    const storedUser = getUser();
    const token = getToken();

    if (storedUser && token) {
      setUser({
        name: storedUser.full_name || "User",
        email: storedUser.email || "user@email.com",
        avatar: "/avatars/shadcn.jpg",
      });

      const userRoles = getRoles(token);
      setRoles(userRoles);
    }
  }, []);

  React.useEffect(() => {
    const combined = roles.reduce((acc: SideBarNavMenuGroupProps[], role) => {
      if (SideBarNavMenuItems[role]) {
        return acc.concat(SideBarNavMenuItems[role]);
      }
      return acc;
    }, []);
    setRoleBasedSideBarNavMenuItems(combined);
  }, [roles]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-1.5">
        <SideBarHeader role={capitalizeFirstLetter(roles.join(" & ") || "No Role Specified")} />
      </SidebarHeader>
      <Separator orientation="horizontal" className="px-4" />
      <SidebarContent className="gap-0">
        <SideBarNavMenu sideBarNavMenuItems={roleBasedSideBarNavMenuItems} />
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter {...user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
