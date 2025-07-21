"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { NavigationRoute } from "@/routes/groups-routes/groups-routes";
import SideBarMenuButtonLink from "../sidebar-menu-button-link/sidebar-menu-button-link";

interface Props {
  item: NavigationRoute;
}

export default function SidebarMenuCollapsible({ item }: Props) {
  const [isOpen, setIsOpen] = React.useState(item.isActive);
  return (
    <Collapsible asChild open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && item.icon}
            <span>{item.title}</span>
            <ChevronRight
              className={`ml-auto transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((subItem, index) =>
              subItem.children ? (
                <SidebarMenuCollapsible key={index} item={subItem} />
              ) : (
                <SidebarMenuSubItem key={index}>
                  <SideBarMenuButtonLink
                    title={subItem.title}
                    icon={subItem.icon}
                    path={subItem.path}
                  />
                </SidebarMenuSubItem>
              )
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
