import { cn } from "@/lib/utils";
import { KanbanProject } from "@/types/project.types";
import { useSortable } from "@dnd-kit/sortable";
import { MessageSquare, Target } from "lucide-react";

interface ProjectDraggableCardProps {
  project: KanbanProject;
}

export function ProjectDraggableCard({ project }: ProjectDraggableCardProps) {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
  } = useSortable({
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
      className="rounded-md text-sm bg-muted p-3"
    >
      <div className="flex items-center gap-2 font-medium line-clamp-2">
        <Target size={18} /> {project.title}
      </div>
      <div className="flex flex-col gap-3">
        {project.startDate && (
          <div className="text-muted-foreground mt-2">
            {new Date(project.startDate).toDateString()}
          </div>
        )}
        {project.priority && (
          <div>
            <span
              className={cn(
                "rounded-sm px-2 py-0.5",
                project.priority === "alta" && "bg-red-500",
                project.priority === "media" && "bg-orange-500",
                project.priority === "baja" && "bg-green-500"
              )}
            >
              {project.priority}
            </span>
          </div>
        )}
        {project.commentsCount > 0 && (
          <div className="flex items-center w-max text-xs justify-center gap-1 p-1 rounded-sm">
            <MessageSquare size={14} /> {project.commentsCount}
          </div>
        )}
        {typeof project.progress === "number" && project.progress > 0 && (
          <div className="mt-1 flex flex-col justify-center gap-2">
            <div className="h-1 block bg-gray-200 rounded-full w-full max-w-20">
              <div
                className="h-1 bg-green-500 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {project.progress}% completado
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
