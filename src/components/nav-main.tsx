"use client";

import { Link, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./sidebar";
import { cn } from "../lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ElementType;
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "px-2 py-8 gap-3 transition-all roudend-md",
                    isActive ? "text-blue-600 bg-blue-50" : "hover:bg-gray-100",
                  )}
                  tooltip={item.title}
                >
                  <Link to={item.url}>
                    {item.icon && (
                      <item.icon
                        className={cn(
                          isActive ? "text-blue-600" : "text-gray-500",
                        )}
                      />
                    )}
                    <span className="text-lg font-normal">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
