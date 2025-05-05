import { CurrentTasks } from "@/components/charts/CurrentTasks";
import { KPIsPanel } from "@/components/charts/KPIsPanel";
import { LatestMonths } from "@/components/charts/LatestMonths";
import { ProjectsStatus } from "@/components/charts/ProjectsStatus";
import { TaskByUser } from "@/components/charts/TaskByUser";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/inicio")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid auto-rows-min gap-4 lg:grid-cols-2">
      <KPIsPanel />
      <LatestMonths />
      <CurrentTasks />
      <TaskByUser />
      <ProjectsStatus />
    </div>
  );
}
