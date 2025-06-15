import { cn } from "@/lib/utils";
import { Project } from "@/types/project.types";
import { useSortable } from "@dnd-kit/sortable";
import { Target } from "lucide-react";

interface ProjectDraggableCardProps {
  project: Project;
}

export function ProjectDraggableCard({ project }: ProjectDraggableCardProps) {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({
      id: project.id,
      data: {
        type: "Project",
        project,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "rounded-md text-sm bg-muted p-3",
        project.stateDto.name === "Completado" &&
          "bg-[var(--project-status-completed)]/10",
        project.stateDto.name === "Cancelado" &&
          "bg-[var(--project-status-canceled)]/10",
        project.stateDto.name === "Curso" &&
          "bg-[var(--project-status-inprogress)]/10",
        project.stateDto.name === "Pausa" &&
          "bg-[var(--project-status-paused)]/10",
        project.stateDto.name === "Riesgo" &&
          "bg-[var(--project-status-risk)]/10"
      )}
    >
      <div className="flex items-center gap-2 font-medium line-clamp-2">
        <Target size={18} /> {project.name}
      </div>
      <div className="flex flex-col gap-3">
        {project.dateStart && (
          <div className="text-muted-foreground mt-2">
            {new Intl.DateTimeFormat("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(project.dateStart))}
          </div>
        )}
        {project.priority && (
          <div>
            <span
              className={cn(
                "priority-tag",
                project.priority === "ALTA" && "priority-high",
                project.priority === "MEDIA" && "priority-medium",
                project.priority === "BAJA" && "priority-low"
              )}
            >
              {project.priority}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
