import { AuthContext } from "@/contexts/Auth";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import {QueryClient} from "@tanstack/react-query"
import NotFound from "@/components/common/NotFound";

interface MyRouterContex {
  auth: AuthContext,
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContex>()({
  component: RootComponent,
  notFoundComponent: NotFound,
  pendingMs: 200,
});

function RootComponent() {
  return <Outlet />;
}
