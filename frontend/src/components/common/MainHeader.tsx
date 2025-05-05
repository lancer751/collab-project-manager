import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SearchForm } from "./SearchForm";
import { getRouteApi, Link } from "@tanstack/react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Bell, CircleUser, LogOut, Settings } from "lucide-react";

export default function MainHeader() {
  const router = getRouteApi("/_auth");
  const {
    auth: { user: currentUser },
  } = router.useRouteContext();
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background flex items-center h-16 px-4 gap-4">
      {/* Logo a la izquierda */}
      <div className="flex items-center min-w-32">
        <img src="/logo.png" alt="logo" className="h-10 w-10" />
        <span className="ml-2 font-bold text-lg hidden md:block">
          Mescob S.A.C
        </span>
      </div>
      {/* Search al centro */}
      <div className="flex-1 flex justify-center">
        <SearchForm className="max-w-md w-full" />
      </div>
      {/* Avatar a la derecha */}
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 rounded-lg bg-muted flex justify-center items-center">
              <AvatarImage src={""} alt="avatar" />
              <AvatarFallback className="rounded-lg uppercase text-sm">
                {currentUser.name
                  .charAt(0)
                  .concat(currentUser.lastname.charAt(0))}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={3}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage src={currentUser.email} alt={currentUser.email} />
                  <AvatarFallback className="rounded-lg">LW</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {`${currentUser.name} ${currentUser.lastname}`}
                  </span>
                  <span className="truncate text-xs">{currentUser.email}</span>
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
              <DropdownMenuItem>
                <LogOut />
                Salir
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
