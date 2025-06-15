import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/tasks")({
  component: RouteComponent,
  loader: () => ({ crumb: "tareas" }),
});

function RouteComponent() {
  return (
    <div className="h-full w-full p-4">
      <Outlet />
    </div>
  );
}
