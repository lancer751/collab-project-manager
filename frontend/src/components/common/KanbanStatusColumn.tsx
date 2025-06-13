import { CircleSmall, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ProjectDraggableCard } from "../ProjectDraggableCard";
import { Project, ProjectStatus } from "@/types/project.types";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { useProjectsByStatus } from "@/hooks/queries/projects.query";
import { cn } from "@/lib/utils";
interface KanbanStatusColumnProps {
  status: ProjectStatus;
  mode: "dragging" | "default";
  activeColumn?: { status: ProjectStatus; projects: Project[] };
}

export default function KanbanStatusColumn({
  activeColumn,
  status,
}: KanbanStatusColumnProps) {
  const { data: projects } = useProjectsByStatus(status);
  const projectsData = projects ?? [];

  const projectsIds = useMemo(() => {
    return (projects ?? []).map((pr) => pr.id);
  }, [projects]);

  return (
    <div
      className={cn(
        "rounded-md w-full h-max bg-primary-foreground px-1.5 py-2",
        status === "Completado" && "bg-[var(--project-status-completed)]/10",
        status === "Cancelado" && "bg-[var(--project-status-canceled)]/10",
        status === "Curso" && "bg-[var(--project-status-inprogress)]/10",
        status === "Pausa" && "bg-[var(--project-status-paused)]/10",
        status === "Riesgo" && "bg-[var(--project-status-risk)]/10"
      )}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span
          className={cn(
            "project-tag-status text-sm",
            status === "Completado" && "project-completed",
            status === "Cancelado" && "project-canceled",
            status === "Curso" && "project-inprogress",
            status === "Pausa" && "project-paused",
            status === "Riesgo" && "project-inrisk"
          )}
        >
          <CircleSmall size={16} className="fill-current" />
          {status}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <SortableContext items={projectsIds}>
          {projectsData.map((pr) => (
            <ProjectDraggableCard key={pr.id} project={pr} />
          ))}
        </SortableContext>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start",
            status === "Completado" &&
              "text-[var(--project-status-completed)]/60 hover:text-[var(--project-status-completed)]/80",
            status === "Cancelado" &&
              "text-[var(--project-status-canceled)]/60 hover:text-[var(--project-status-canceled)]/80",
            status === "Curso" &&
              "text-[var(--project-status-inprogress)]/60 hover:text-[var(--project-status-inprogress)]/80",
            status === "Pausa" &&
              "text-[var(--project-status-paused)]/60 hover:text-[var(--project-status-paused)]/80",
            status === "Riesgo" &&
              "text-[var(--project-status-risk)]/60 hover:text-[var(--project-status-risk)]/80"
          )}
          onClick={() => {
            console.log("click");
          }}
        >
          <PlusIcon /> Nuevo proyecto
        </Button>
      </div>
    </div>
  );
}
