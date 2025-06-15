import { ProjectDraggableCard } from "../ProjectDraggableCard";
import { Project, ProjectStatus } from "@/types/project.types";
import { useProjectsByStatus } from "@/hooks/queries/projects.query";
import { StatusColumn } from "./StatusColumn";
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

export function KanbanProjectColumn({
  status,
}: KanbanStatusColumnProps) {
  const { data: projects = [] } = useProjectsByStatus(status);
  return (
    <StatusColumn
      status={status}
      items={projects}
      getId={(pr) => pr.id}
      renderItem={(pr) => <ProjectDraggableCard project={pr} />}
      addButtonLabel="Nuevo Projecto"
      onAdd={() => console.log("Añadir nueva tarea en", status)}
      statusColorMap={statusColorMap}
    />
  );
}
