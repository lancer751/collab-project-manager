import { KanbanTaskColumn } from "@/components/KanbanTaskColumn";
import { useProjectStatus } from "@/hooks/queries/projects.query";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/_auth/dashboard/tasks/kanban")({
  component: RouteComponent,
  loader: () => ({ crumb: "tablero" }),
});

function RouteComponent() {
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
    <div className="overflow-x-auto h-full">
      <div className="relative">
        <div className="min-w-full grid grid-flow-col grid-cols-[repeat(5,minmax(300px,1fr))] gap-4 absolute top-0 left-0 p-4">
          <DndContext sensors={sensors}>
            <SortableContext items={columnsIds}>
              {projectStatus &&
                projectStatus.map((status) => (
                  <KanbanTaskColumn
                    key={status.name}
                    status={status.name}
                    mode="default"
                  />
                ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
