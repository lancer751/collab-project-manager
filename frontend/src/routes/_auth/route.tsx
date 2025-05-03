import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SearchForm } from "@/components/common/SearchForm";
import { LoadingScreen } from "@/components/common/LoadingScreen";

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
      <header className="sticky top-0 z-30 w-full border-b bg-background flex items-center h-16 px-4 gap-4">
        {/* Logo a la izquierda */}
        <div className="flex items-center min-w-32">
          <img src="/logo.png" alt="logo" className="h-10 w-10" />
          <span className="ml-2 font-bold text-lg hidden md:block">Mescob S.A.C</span>
        </div>
        {/* Search al centro */}
        <div className="flex-1 flex justify-center">
          <SearchForm className="max-w-md w-full" />
        </div>
        {/* Avatar a la derecha */}
        <div className="flex items-center min-w-16 justify-end">
          <Avatar>
            <AvatarImage src={undefined} alt="avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <Outlet/>
    </>
  );
}
