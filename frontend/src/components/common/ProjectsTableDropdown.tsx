import {
  useProjectsByStatus,
  useProjectStatus,
} from "@/hooks/queries/projects.query";
import { ProjectStatus } from "@/types/project.types";
import { ChevronDownCircle, CircleSmall } from "lucide-react";
import { DataTable } from "./data-table";
import { ProjectColumns } from "../columns/ProjectCclumns";
import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface ProjectsByStatusTableProps {
  name: ProjectStatus;
}

export function ProjectsByStatusTable({ name }: ProjectsByStatusTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const { data: projects, isPending, isLoading } = useProjectsByStatus(name);
  console.log(projects);
  const handleEditProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setOpen(true);
  };
  return (
    <div
      className={cn(
        "w-max h-full px-10 pb-5",
        isLoading && "min-h-96"
      )}
    >
      <DataTable
        columns={ProjectColumns({ onEdit: handleEditProject })}
        data={projects ?? []}
        isLoading={isLoading}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
}

export function ProjectsTableDropdown() {
  const { data: projectStatus, isPending } = useProjectStatus();

  return (
    <div className="space-y-6 absolute h-full top-0 left-0 w-full">
      {projectStatus &&
        projectStatus.map((status) => (
          <div key={status.name} className="space-y-4 w-full">
            <div className="flex gap-2 items-center sticky top-0 left-0 bg-background z-20">
              <ChevronDownCircle size={18} />
              <span
                className={cn(
                  "project-tag-status text-sm",
                  status.name === "Completado" && "project-completed",
                  status.name === "Cancelado" && "project-canceled",
                  status.name === "Curso" && "project-inprogress",
                  status.name === "Pausa" && "project-paused",
                  status.name === "Riesgo" && "project-inrisk"
                )}
              >
                <CircleSmall size={18} className="fill-current" />
                {status.name}
              </span>
            </div>
            <ProjectsByStatusTable name={status.name} />
          </div>
        ))}
    </div>
  );
}
