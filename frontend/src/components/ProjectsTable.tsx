import { useInfiniteProjects } from "@/hooks/queries/projects.query";
import { useMemo, useState } from "react";
import { DataTable } from "./common/data-table";
import { ProjectColumns } from "./columns/ProjectCclumns";
import { RowSelectionState } from "@tanstack/react-table";

export function ProjectsTable() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteProjects();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const projects = useMemo(() => {
    return data ? data.pages.flatMap((page) => page?.project ?? []) : [];
  }, [data]);

  console.log(projects);
  const queryUtilities = {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  };
  return (
    <DataTable
      columns={ProjectColumns()}
      data={projects}
      queryUtilities={queryUtilities}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    />
  );
}
