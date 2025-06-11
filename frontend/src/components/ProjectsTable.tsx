import { useInfiniteProjects } from "@/hooks/queries/projects.query";
import { useMemo, useState } from "react";
import { DataTable } from "./common/data-table";
import { ProjectColumns } from "./columns/ProjectCclumns";
import { RowSelectionState } from "@tanstack/react-table";
import { createPortal } from "react-dom";
import { ProjectModalForm } from "./common/ProjectModalForm";

export function ProjectsTable() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteProjects();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [open, setOpen] = useState(false);
  const projects = useMemo(() => {
    return data ? data.pages.flatMap((page) => page?.project ?? []) : [];
  }, [data]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const queryUtilities = {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  };

  const handleEditProject = (projectId: number) => {
    setSelectedProjectId(projectId);
    setOpen(true);
  };

  return (
    <div className="min-w-full h-full px-10 pb-16 overflow-x-auto relative">
      <div className="absolute top-0 bottom-0">
        <DataTable
          columns={ProjectColumns({ onEdit: handleEditProject })}
          data={projects}
          queryUtilities={queryUtilities}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          isLoading={isLoading}
        />
      </div>
      {createPortal(
        <ProjectModalForm
          isOpen={open}
          mode="create"
          projectId={selectedProjectId}
          onClose={() => setOpen(false)}
        />,
        document.body
      )}
    </div>
  );
}
