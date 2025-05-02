import { CurrentTasks } from "@/components/charts/CurrentTasks";
import { LatestMonths } from "@/components/charts/LatestMonths";
import { ProjectsStatus } from "@/components/charts/ProjectsStatus";
import { TaskByUser } from "@/components/charts/TaskByUser";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex flex-1 flex-col gap-4 ">
      <div className="grid auto-rows-min gap-4 lg:grid-cols-2">
        <LatestMonths />
        <CurrentTasks/>
        <TaskByUser/>
        <ProjectsStatus/>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-96" />
    </div>
  );
}
