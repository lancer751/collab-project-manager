import { Dot, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ProjectDraggableCard } from "../ProjectDraggableCard";
import { KanbanColumn } from "@/types/project.types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";
interface KanbanStatusColumnProps {
  column: KanbanColumn;
  mode: "dragging" | "default";
}

export default function KanbanStatusColumn({
  column,
}: KanbanStatusColumnProps) {
  const {
    setNodeRef,
    isDragging,
    transform,
    transition,
    attributes,
    listeners,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;
  const projectsIds = useMemo(() => {
    return column.projects.map((pr) => pr.id);
  }, [column]);
  
  return isDragging ? (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-md h-max bg-primary-foreground px-1.5 py-2 opacity-40"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="rounded-md inline-flex py-0.5 px-2 items-center gap-0.5 justify-center bg-secondary text-sm">
          <Dot size={16} />
          {column.name}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <SortableContext items={projectsIds}>
          {column.projects.map((pr) => (
            <ProjectDraggableCard key={pr.id} project={pr} />
          ))}
        </SortableContext>
        <Button variant={"outline"}>
          <PlusIcon /> Nuevo proyecto
        </Button>
      </div>
    </div>
  ) : (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="rounded-md h-max bg-primary-foreground px-1.5 py-2"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="rounded-md inline-flex py-0.5 px-2 items-center gap-0.5 justify-center bg-secondary text-sm">
          <Dot size={16} />
          {column.name}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <SortableContext items={projectsIds}>
          {column.projects.map((pr) => (
            <ProjectDraggableCard key={pr.id} project={pr} />
          ))}
        </SortableContext>
        <Button variant={"outline"}  onClick={() => {console.log("click")}}>
          <PlusIcon /> Nuevo proyecto
        </Button>
      </div>
    </div>
  );
}
