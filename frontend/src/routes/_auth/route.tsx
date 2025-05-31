import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { DasboardSidebar } from "@/components/common/dashboard-sidebar";
import DashboardHeader from "@/components/common/DashboardHeader";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    const currentUser =
      context.auth.user ?? (await context.auth.isAuthenticated());
    if (!currentUser) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
    return {
      auth: {
        ...context.auth,
        user: currentUser,
      },
    };
  },
  component: RouteComponent,
  pendingComponent: () => <LoadingScreen/>,
  notFoundComponent: () => <p>No encontrado</p>
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <DasboardSidebar />
      <SidebarInset>
        <DashboardHeader />
          <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
