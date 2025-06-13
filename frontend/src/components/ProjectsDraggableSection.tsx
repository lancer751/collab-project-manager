import { useMemo } from "react";
import KanbanStatusColumn from "./common/KanbanStatusColumn";

import {
  SortableContext,
} from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useProjectStatus } from "@/hooks/queries/projects.query";

export default function ProjectsDraggableSection() {
  const { data: projectStatus } = useProjectStatus();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const columnsIds = useMemo(() => {
    return projectStatus ? projectStatus.map((status) => status.name) : [];
  }, [projectStatus]);

  return (
    <div className="relative">
      <div className="min-w-full grid grid-flow-col grid-cols-[repeat(5,minmax(300px,1fr))] gap-4 absolute top-0 left-0 p-4">
        <DndContext sensors={sensors}>
          <SortableContext items={columnsIds}>
          {projectStatus &&
            projectStatus.map((status) => (
              <KanbanStatusColumn
              key={status.name}
              status={status.name}
              mode="default"
              />
            ))}
            </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
