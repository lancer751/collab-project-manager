import { LoadingScreen } from "@/components/common/LoadingScreen";
import { AuthContext } from "@/contexts/Auth";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";

interface MyRouterContex {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContex>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <h1>404 not found</h1>
        <Link to="/">Regresar</Link>
      </div>
    );
  },
  pendingMs: 200,
  pendingComponent: () => <LoadingScreen/>
});

function RootComponent() {
  return <Outlet />;
}
