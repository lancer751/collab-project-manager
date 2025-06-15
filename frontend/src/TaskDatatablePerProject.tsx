import { RowSelectionState } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "./components/common/data-table";
import { TaskColumns } from "./components/columns/TaskColumns";
import { useSingleProjectById } from "./hooks/queries/projects.query";
import { createPortal } from "react-dom";
import { TaskModalForm } from "./components/common/TaskModalForm";

interface TaskDatatablePerProjectProps {
  projectId: number;
}
export function TaskDatatablePerProject({
  projectId,
}: TaskDatatablePerProjectProps) {
  const { data: project, isPending } = useSingleProjectById(projectId);
  const [open, setOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const handleEditProject = (taskId: number) => {
    setSelectedProjectId(taskId);
    setOpen(true);
  };
  return (
    <>
      <DataTable
        columns={TaskColumns({ onEdit: handleEditProject })}
        data={project?.activity ?? []}
        isLoading={isPending}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      {createPortal(
        <TaskModalForm
          isOpen={open}
          mode="edit"
          taskId={selectedProjectId}
          onClose={() => setOpen(false)}
        />,
        document.body
      )}
    </>
  );
}
