import { useMemo, useState } from "react";
import KanbanStatusColumn from "./common/KanbanStatusColumn";
import projectsKanban from "@/mock/projectsKanban.json";
import { KanbanColumn, KanbanProject } from "@/types/project.types";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { useGetAllRols } from "@/hooks/queries/roles";

export default function ProjectsDraggableSection() {
  const { data } = useGetAllRols();
  console.log(data);
  const [columnsByStatus, setColumnByStatus] = useState<KanbanColumn[]>(
    projectsKanban.columns as KanbanColumn[]
  );
  const [activeProject, setActiveProject] = useState<KanbanProject | null>(
    null
  );
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const [activeColumn, setActiveColumn] = useState<KanbanColumn | null>(null);
  console.log(activeProject)

  const columnsIds = useMemo(() => {
    return columnsByStatus.map((col) => col.id);
  }, [columnsByStatus]);

  const handleDragStart = (event: DragStartEvent) => {
    if (!event.active) return;
    const {
      active: {
        data: { current },
      },
    } = event;
    if (!current) return;
    if (current.type === "Column") {
      setActiveColumn(current.column as KanbanColumn);
    }
    if (current.type === "Project") {
      setActiveProject(current.project as KanbanProject);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.active || !event.over) return;
    const { active, over } = event;
    if (active.id === over.id) return;
    const activeIndex = columnsIds.findIndex((id) => id === active.id);
    const overIndex = columnsIds.findIndex((id) => id === over.id);

    setColumnByStatus((prev) => arrayMove([...prev], activeIndex, overIndex));
    setActiveColumn(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={columnsIds}>
          {columnsByStatus.map((col) => (
            <KanbanStatusColumn key={col.id} column={col} mode="default" />
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanStatusColumn column={activeColumn} mode="dragging" />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
