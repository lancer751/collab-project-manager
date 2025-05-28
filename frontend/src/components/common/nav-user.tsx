import { User } from "@/types/user.types";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Bell,
  ChevronsUpDown,
  CircleUser,
  LogOut,
  Settings,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLogoutMutation } from "@/hooks/mutations/auth.mutation";

export function NavUser({ user }: { user: User | null }) {
  const { isMobile } = useSidebar();
  const {mutateAsync: logoutSessionMutation} = useLogoutMutation() 
  const handleLogout = () => logoutSessionMutation()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.email}
                  alt={`${user?.name} ${user?.lastname}`}
                />
                <AvatarFallback className="rounded-lg uppercase">
                  {user?.name.charAt(0).concat(user?.lastname.charAt(0))}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.name} {user?.lastname}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={15}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage src={user?.email} alt={user?.email} />
                  <AvatarFallback className="rounded-lg">LW</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {`${user?.name} ${user?.lastname}`}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={"/dashboard/inicio"}>
                <DropdownMenuItem>
                  <CircleUser />
                  Mi Perfil
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Bell />
                Ajuste de Notificaciones
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} variant="destructive">
                <LogOut />
                Salir
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
