import {
  Target,
  SquareCheck,
  House,
  Inbox,
  UsersRound,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Button } from "../ui/button";
import { useLogoutMutation } from "@/hooks/mutations/auth.mutation";
import { getRouteApi } from "@tanstack/react-router";

// hardcode
const navMain = [
  {
    title: "Inicio",
    url: "/dashboard/inicio",
    icon: House,
    isActive: true,
  },
  {
    title: "Bandeja de Entrada",
    url: "/dashboard/inbox",
    icon: Inbox,
    isActive: false,
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: UsersRound,
    isActive: false,
  },
  {
    title: "Proyectos",
    url: "/dashboard/projects",
    icon: Target,
    isActive: false,
  },
  {
    title: "Tareas",
    url: "/dashboard/tasks",
    icon: SquareCheck,
    isActive: false,
  },
  {
    title: "Ajustes",
    url: "/dashboard/settings",
    icon: Settings,
    isActive: false,
  },
];

export function DasboardSidebar() {
  const currRoute = getRouteApi("/_auth");
  const {
    auth: { user: currentUser },
  } = currRoute.useRouteContext();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-transparent">
              <div className="flex items-center justify-start">
                <img src="/logo.png" alt="logo" className="inline-flex h-7 w-7 object-cover" />
                <span className="ml-2 font-bold text-lg hidden md:block">
                  Mescob S.A.C
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain}></NavMain>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
