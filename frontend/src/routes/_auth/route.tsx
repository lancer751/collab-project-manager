import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import MainHeader from "@/components/common/MainHeader";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({context, location}) => {
    const currentUser = context.auth.user ?? await context.auth.isAuthenticated()
    console.log(currentUser)
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
