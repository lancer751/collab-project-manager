import { cn } from "@/lib/utils";
import { Task } from "@/types/task.types";
import { useSortable } from "@dnd-kit/sortable";
import { Target } from "lucide-react";

interface TaskDraggableCardProps {
    task: Task;
  }
export default function TaskDraggableCard({task}: TaskDraggableCardProps) {
    const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({
      id: task.id,
      data: {
        type: "Project",
        task,
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
        task.state.name === "Completado" &&
          "bg-[var(--project-status-completed)]/10",
        task.state.name === "Cancelado" &&
          "bg-[var(--project-status-canceled)]/10",
        task.state.name === "Curso" &&
          "bg-[var(--project-status-inprogress)]/10",
        task.state.name === "Pausa" &&
          "bg-[var(--project-status-paused)]/10",
        task.state.name === "Riesgo" &&
          "bg-[var(--project-status-risk)]/10"
      )}
    >
      <div className="flex items-center gap-2 font-medium line-clamp-2">
        <Target size={18} /> {task.name}
      </div>
      <div className="flex flex-col gap-3">
        {task.dateStart && (
          <div className="text-muted-foreground mt-2">
            {new Intl.DateTimeFormat("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(task.dateStart))}
          </div>
        )}
        {task.prioridad && (
          <div>
            <span
              className={cn(
                "priority-tag",
                task.prioridad === "ALTA" && "priority-high",
                task.prioridad === "MEDIA" && "priority-medium",
                task.prioridad === "BAJA" && "priority-low"
              )}
            >
              {task.prioridad}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
