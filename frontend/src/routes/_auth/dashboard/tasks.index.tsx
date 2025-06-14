import { TasksAssigned } from "@/components/charts/TasksAssigned";
import { RecentComments } from "@/components/RecentComments";
import { RecentTasks } from "@/components/RecentTasks";
import TaskDataTable from "@/components/TaskDataTable";
import TasksNearDeadline from "@/components/TasksNearDeadline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <RecentTasks className="col-span-1 md:col-span-2" />
      <TasksAssigned className="col-span-1 md:col-span-2" />
      <Card className="col-span-1 sm:col-span-2 md:col-span-4">
        <CardHeader>
          <CardTitle>Todos las Tareas</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto relative min-h-[220px] w-full">
          <TaskDataTable/>
        </CardContent>
      </Card>
      <TasksNearDeadline className='col-span-1 md:col-span-2'/>
    <RecentComments className='col-span-1 md:col-span-2'/>
    </div>
  );
}
