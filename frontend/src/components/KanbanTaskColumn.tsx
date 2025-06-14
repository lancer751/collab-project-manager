import { Project, ProjectStatus } from "@/types/project.types";
import { StatusColumn } from "./common/StatusColumn";
import { useInfiniteTask } from "@/hooks/queries/task.query";
import TaskDraggableCard from "./TaskDraggableCard";
import { useMemo } from "react";
interface KanbanStatusColumnProps {
  status: ProjectStatus;
  mode: "dragging" | "default";
  activeColumn?: { status: ProjectStatus; projects: Project[] };
}

const statusColorMap: Record<ProjectStatus, string> = {
  Completado: "bg-[var(--project-status-completed)]/10",
  Cancelado: "bg-[var(--project-status-canceled)]/10",
  Curso: "bg-[var(--project-status-inprogress)]/10",
  Pausa: "bg-[var(--project-status-paused)]/10",
  Riesgo: "bg-[var(--project-status-risk)]/10",
};

export function KanbanTaskColumn({
  status,
}: KanbanStatusColumnProps) {
  const {data: tasksData} = useInfiniteTask()
  const tasks = useMemo(() => {
    return tasksData ? tasksData.pages.flatMap((page) => page?.activities ?? []) : [];
  }, [tasksData]);

  const filteredByStatus = useMemo(() => {
    return tasks.filter(t => t.state.name === status)
  }, [tasks, status])
  return (
    <StatusColumn
      status={status}
      items={filteredByStatus}
      getId={(t) => t.id}
      renderItem={(t) => <TaskDraggableCard task={t} />}
      addButtonLabel="Nuevo Tarea"
      onAdd={() => console.log("Añadir nueva tarea en", status)}
      statusColorMap={statusColorMap}
    />
  );
}
