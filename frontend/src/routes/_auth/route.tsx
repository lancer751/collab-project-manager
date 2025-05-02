import { DasboardSidebar } from "@/components/common/dashboard-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({context, location}) => {
    const currentUser = await context.auth.isAuthenticated()
    if(!currentUser){
      throw redirect({
        to: "/",
        search: {
          redirect: location.href
        }
      })
    }
    return {
      auth: {
        ...context.auth,
        user: currentUser
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <DasboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,_height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="p-4">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
