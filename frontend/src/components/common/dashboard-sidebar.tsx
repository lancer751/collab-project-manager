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
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

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
  const currRoute = getRouteApi("/_auth");
  const router = useRouter()
  const {auth: {user: currentUser, logoutSession}} = currRoute.useRouteContext()
  const navigate = currRoute.useNavigate()

  const handleLogout = () => {
    logoutSession().then(() => {
      router.invalidate().finally(() => {
        navigate({to: "/"})
      })
    })
  }

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
        <Button onClick={handleLogout} variant={"destructive"}>
          <LogOut/>
          <span>Salir</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
