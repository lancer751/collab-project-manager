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
} from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutMutation } from "@/hooks/mutations/auth.mutation";

// hardcode
const data = {
  user: {
    id: 2,
    username: "Lau Pacheco",
    email: "pachecolau27@gmail.com",
    profile: "image.png",
  },
  navMain: [
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
  ],
};

export function DasboardSidebar({ ...props }) {
  const {user: currentUser} = useAuth()
  const {mutateAsync: logoutSession} = useLogoutMutation()

  return (
    <Sidebar
      variant="sidebar"
      className="top-16 h-[calc(100%-64px)]"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <NavUser user={currentUser} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}></NavMain>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={async() => logoutSession()} variant={"destructive"}>
          <LogOut/>
          <span>Salir</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
