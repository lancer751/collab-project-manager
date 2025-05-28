import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SearchForm } from "./SearchForm";
import {
  getRouteApi,
  Link,
  useLocation,
  useMatches,
} from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Bell,
  CircleUser,
  LogOut,
  PlusCircle,
  Settings,
  SquareCheck,
  Target,
  User,
  UsersRound,
} from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { useLogoutMutation } from "@/hooks/mutations/auth.mutation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";

export default function DashboardHeader() {
  const router = getRouteApi("/_auth");
  const { mutateAsync: LogoutSessionMutation } = useLogoutMutation();
  const {
    auth: { user: currentUser },
  } = router.useRouteContext();
  const matches = useMatches();
  const breadCrumbItems = matches
    .filter(({ loaderData }) => loaderData?.crumb)
    .map(({ pathname, loaderData }) => ({
      label: loaderData?.crumb,
      href: pathname,
    }));
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(breadCrumbItems);
  const handleLogoutSession = () => LogoutSessionMutation();
  return (
    <header className="sticky top-0 z-10">
      <nav className=" w-full bg-background border-b flex items-center shrink-0 h-16 px-4 gap-4 transition-[width,_height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {/* Search al centro */}
        <div className="flex-1 flex justify-center items-center">
          <SearchForm className="max-w-md w-full" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"}>
                <PlusCircle /> Agregar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={10}>
              <DropdownMenuItem>
                <UsersRound />
                Usuario
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Target />
                Proyecto
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SquareCheck />
                Tarea
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              sideOffset={10}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="w-8 h-8 rounded-lg">
                    <AvatarImage
                      src={currentUser.email}
                      alt={currentUser.email}
                    />
                    <AvatarFallback className="rounded-lg">LW</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {`${currentUser.name} ${currentUser.lastname}`}
                    </span>
                    <span className="truncate text-xs">
                      {currentUser.email}
                    </span>
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
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogoutSession}
                >
                  <LogOut />
                  Salir
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <nav className="w-full bg-background border-b flex items-center shrink-0 h-12 px-4 gap-4 transition-[width,_height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <Breadcrumb>
          <BreadcrumbList>
            {breadCrumbItems.map((crumb, index) => (
              <BreadcrumbItem key={crumb.label}>
                {crumb.href !== currentPath ? (
                  <BreadcrumbLink href={crumb.href} className="capitalize">
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="capitalize">
                    {crumb.label}
                  </BreadcrumbPage>
                )}
                {index < breadCrumbItems.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </header>
  );
}
