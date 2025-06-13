import { SingleProjectModal } from "@/components/common/SingleProjectModal";
import { LoadingFallback } from "@/components/loaders/LoadingFallback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { XCircle } from "lucide-react";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
  notFoundComponent: () => (
    <div className="flex h-full w-full items-center justify-center p-4">
      <Card className="max-w-sm w-full text-center">
        <CardHeader className="space-y-2">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <CardTitle className="text-lg md:text-3xl">
            404 · Página no encontrada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Lo sentimos, la ruta que intentas visitar no existe dentro de este
            dashboard.
          </p>
          <Link to="/dashboard/inicio">
            <Button variant="outline" className="w-full">
              Volver al Inicio
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  ),
  pendingComponent: () => <LoadingFallback />,
});

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams: { prjt?: number; tsk?: number } =
    useSearch({ strict: false }) ?? {};
  const matchRoute = useMatch({
    from: "/_auth/dashboard",
    shouldThrow: false,
  });

  const handleOpenModal = (open: boolean) => {
    if (!open) {
      navigate({ to: location.pathname, search: {} });
    }
  }
  return (
    <>
      <Outlet />
      {matchRoute && searchParams.prjt && (
        <SingleProjectModal projectId={searchParams.prjt} onClose={handleOpenModal}/>
      )}
    </>
  );
}
