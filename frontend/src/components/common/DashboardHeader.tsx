import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
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
  PlusCircleIcon,
  Settings,
  SquareCheck,
  Target,
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
import SearchCommandMenu from "./SearchCommandMenu";
import { Route as ProjectsRoute } from "@/routes/_auth/dashboard/projects";
import { Route as TasksRoute } from "@/routes/_auth/dashboard/tasks";
import { ProjectsNavbar } from "./ProjectsNavbar";
import { Fragment, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectModalForm } from "./ProjectModalForm";
import TasksNavbar from "../TasksNavbar";
import { TaskModalForm } from "./TaskModalForm";

export default function DashboardHeader() {
  const router = getRouteApi("/_auth");
  const { mutateAsync: LogoutSessionMutation } = useLogoutMutation();
  const {
    auth: { user: currentUser },
  } = router.useRouteContext();
  const matches = useMatches();
  const breadCrumbItems = useMemo(() => {
    return matches
      .filter(({ loaderData }) => loaderData?.crumb)
      .map(({ pathname, loaderData }) => ({
        label: loaderData?.crumb,
        href: pathname,
      }));
  }, [matches]);
  const location = useLocation();
  const currentPath = location.pathname;
  const handleLogoutSession = () => LogoutSessionMutation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <header className="sticky top-0 z-10">
      <nav className=" w-full bg-background border-b flex items-center shrink-0 h-16 px-4 gap-4 transition-[width,_height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex-1 flex justify-center items-center gap-2">
          <SearchCommandMenu />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"sm"}>
                <PlusCircle /> Nuevo
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
      {/* second navigation */}
      <nav className="w-full bg-background border-b flex items-center justify-between shrink-0 h-12 px-4 gap-4 transition-[width,_height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              {breadCrumbItems.map((crumb, index) => (
                <Fragment key={crumb.label}>
                  <BreadcrumbItem key={crumb.label}>
                    {!crumb.href.includes(currentPath) ? (
                      <BreadcrumbLink href={crumb.href} className="capitalize">
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="capitalize">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadCrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="items-center gap-2">
          {currentPath.includes(ProjectsRoute.fullPath) && (
            <Button size={"sm"} onClick={() => setOpen(true)}>
              <PlusCircleIcon /> Agregar
            </Button>
          )}
          {currentPath.includes(TasksRoute.fullPath) && (
            <Button size={"sm"} onClick={() => setOpen2(true)}>
              <PlusCircleIcon /> Nueva Tarea
            </Button>
          )}
        </div>
        {createPortal(
          <ProjectModalForm
            isOpen={open}
            onClose={() => setOpen(!open)}
            mode="create"
            projectId={null}
          />,
          document.body
        )}
        {
          <TaskModalForm isOpen={open2} onClose={() => setOpen2(!open2)} taskId={null} mode="create"/>
        }
      </nav>
      {currentPath.includes(ProjectsRoute.fullPath) && <ProjectsNavbar />}
      {currentPath.includes(TasksRoute.fullPath) && <TasksNavbar />}
    </header>
  );
}
