import {
  createFileRoute,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/projects")({
  component: ProjectsPage,
  loader: () => ({ crumb: "proyectos" }),
});

export function ProjectsPage() {
  return (
    <div className="p-4 h-full w-full">
      <Outlet/>
    </div>
  );
}
