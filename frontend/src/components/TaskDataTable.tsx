import { useInfiniteTask } from "@/hooks/queries/task.query";
import { DataTable } from "./common/data-table";
import { TaskColumns } from "./columns/TaskColumns";
import { useMemo, useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { createPortal } from "react-dom";
import { TaskModalForm } from "./common/TaskModalForm";

export default function TaskDataTable() {
  const { data, isPending, fetchNextPage, hasNextPage, isError, error, isFetchingNextPage } = useInfiniteTask();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const [open, setOpen] = useState(false);
  const handleEditTask = (id: number) => {
    setSelectedProjectId(id);
    setOpen(true);
  };

  const tasks = useMemo(() => {
    return data ? data.pages.flatMap((page) => page?.activities ?? []) : [];
  }, [data]);

  const queryUtilities = {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  };

  return (
    <div className="min-w-full h-full overflow-x-auto relative">
      <div className="absolute top-0 left-0 right-0">
        <DataTable
          columns={TaskColumns({ onEdit: handleEditTask })}
          data={tasks}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          isLoading={isPending}
          queryUtilities={queryUtilities}
        />
      </div>
      {createPortal(
        <TaskModalForm
          isOpen={open}
          mode="edit"
          taskId={selectedProjectId}
          onClose={() => setOpen(false)}
        />,
        document.body
      )}
    </div>
  );
}
