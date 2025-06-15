import { useProjectsSummary } from "@/hooks/queries/projects.query";
import { cn } from "@/lib/utils";
import { TaskDatatablePerProject } from "@/TaskDatatablePerProject";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDownCircle, CircleSmall } from "lucide-react";

export const Route = createFileRoute("/_auth/dashboard/tasks/per-project")({
  component: RouteComponent,
  loader: () => ({ crumb: "por proyecto" }),
});

function RouteComponent() {
  const { data: projects = [] } = useProjectsSummary();

  return (
    <div className="relative overflow-auto w-full h-full pb-12">
      <div className="space-y-6 absolute h-full top-0 left-0 w-full">
        {projects.map(({id, name}) => (
          <div key={id} className="space-y-4 w-full">
            <div className="flex gap-2 items-center sticky top-0 left-0 bg-background z-20">
              <ChevronDownCircle size={18} />
              <span
                className={cn(
                  "project-tag-status text-sm",
                )}
              >
                <CircleSmall size={18} className="fill-current" />
                {name}
              </span>
            </div>
            <TaskDatatablePerProject projectId={id} />
          </div>
        ))}
      </div>
    </div>
  );
}
