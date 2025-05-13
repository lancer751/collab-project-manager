import { CurrentTasks } from "@/components/charts/CurrentTasks";
import { KPIsPanel } from "@/components/charts/KPIsPanel";
import { LatestMonths } from "@/components/charts/LatestMonths";
import { ProjectsStatus } from "@/components/charts/ProjectsStatus";
import { TaskByUser } from "@/components/charts/TaskByUser";
import {
  getCountLatestProjects,
  getCountProjectsByState,
  getRelevantKPIS,
  getTasksByState,
  getTasksByUser,
} from "@/services/graphs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/inicio")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["latestMonthProjects"],
        queryFn: getCountLatestProjects,
      }),
      queryClient.prefetchQuery({
        queryKey: ["tasksByState"],
        queryFn: getTasksByState,
      }),
      queryClient.prefetchQuery({
        queryKey: ["relevantKPIS"],
        queryFn: getRelevantKPIS,
      }),
      queryClient.prefetchQuery({
        queryKey: ["countProjectsByState"],
        queryFn: getCountProjectsByState,
      }),
      queryClient.prefetchQuery({
        queryKey: ["countTasksByUser"],
        queryFn: getTasksByUser,
      }),
    ]);
  },
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
