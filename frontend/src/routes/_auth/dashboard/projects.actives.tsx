import { ProjectsTableDropdown } from "@/components/common/ProjectsTableDropdown";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/projects/actives")({
  component: RouteComponent,
  loader: () => ({ crumb: "activos" }),
});

function RouteComponent() {
  return (
    <div className="relative overflow-auto w-full h-full pb-12">
        <ProjectsTableDropdown/>
    </div>
  );
}
