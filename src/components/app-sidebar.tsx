"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "./sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import { MdOutlineDashboard } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { RiToothLine } from "react-icons/ri";
import { Separator } from "./separator";

const data = {
  navMain: [
    {
      title: "Início",
      url: "/",
      icon: MdOutlineDashboard,
    },
    {
      title: "Agenda",
      url: "/books",
      icon: LuNotebookText,
    },
    {
      title: "Pacientes",
      url: "/patients",
      icon: GoPeople,
    },
    {
      title: "Dentistas",
      url: "/dentists",
      icon: RiToothLine,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! h-16 mb-4"
            >
              <a
                href="/"
                className="flex flex-col justify-start items-start transition-all hover:opacity-70"
              >
                <h2 className="text-2xl font-medium text-blue-500">
                  Clínica Odonto
                </h2>
                <p className="text-gray-400 text-sm font-normal">
                  Gerenciamento de Consultas
                </p>
              </a>
            </SidebarMenuButton>
            <Separator />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />{" "}
      </SidebarFooter>
    </Sidebar>
  );
}
