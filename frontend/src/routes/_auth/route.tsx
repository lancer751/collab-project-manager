import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SearchForm } from "@/components/common/SearchForm";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import MainHeader from "@/components/common/MainHeader";

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
  pendingComponent: () => <LoadingScreen/>
});

function RouteComponent() {
  return (
    <>
      <MainHeader/>
      <Outlet/>
    </>
  );
}
