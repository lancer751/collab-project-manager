import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/projects")({
  component: RouteComponent,
  loader: () => ({ crumb: "proyectos" }),
});

function RouteComponent() {
  return (
    <div className="p-4 h-full w-full">
      <Outlet />
    </div>
  );
}
