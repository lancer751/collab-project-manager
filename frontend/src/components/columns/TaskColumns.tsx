import type { ColumnDef } from "@tanstack/react-table";
import { CircleSmall, Delete, Edit, PanelBottomOpen } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useDeleteProject } from "@/hooks/mutations/project.mutation";
import { Task } from "@/types/task.types";
import AvatarGroup from "../common/AvatarGroup";
import { formatDateToString } from "@/helpers/utils/formatDate";

export const TaskNameCell = ({
  task,
  onEdit,
}: {
    task: Task;
  onEdit: (projectId: number) => void;
}) => {
  const { mutateAsync: deleteProject, isPending } = useDeleteProject();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "flex items-center group relative",
            isPending && "pointer-events-none"
          )}
        >
          {task.name}
          <Button
            size={"sm"}
            className="absolute top-1/2 -translate-y-1/2 right-0 hidden group-hover:inline-flex z-20"
            disabled={isPending}
            asChild
          >
            <Link
              to={currentPath}
              search={(prev) => ({
                ...prev,
                tsk: task.id,
              })}
              className={cn(isPending && "text-muted-foreground")}
              disabled={isPending}
              resetScroll={false}
            >
              <PanelBottomOpen />
              Ver
            </Link>
          </Button>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onEdit(task.id)}>
          <Edit /> Editar
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => deleteProject(task.id)}
          variant="destructive"
        >
          <Delete /> Eliminar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const TaskColumns = ({
  onEdit,
}: {
  onEdit: (taskId: number) => void;
}): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select All"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="selected-row"
      />
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: "Tareas",
    cell: ({ row }) => {
      const task = row.original as Task;
      return <TaskNameCell task={task} onEdit={onEdit} />;
    },
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const { state } = row.original as Task;
      return (
        <span
          className={cn(
            "project-tag-status",
            state.name === "Completado" && "project-completed",
            state.name === "Cancelado" && "project-canceled",
            state.name === "Curso" && "project-inprogress",
            state.name === "Pausa" && "project-paused",
            state.name === "Riesgo" && "project-inrisk"
          )}
        >
          <CircleSmall size={16} className="fill-current" />
          {state.name}
        </span>
      );
    },
  },
  {
    accessorKey: "users",
    header: "Responsables",
    cell: ({ row }) => {
      const { users } = row.original as Task;
      return (
        <AvatarGroup avatars={users} limit={5}/>
      );
    },
  },
  {
    accessorKey: "dateStart",
    header: "Fecha de inicio",
    cell: ({ row }) => {
      const {dateStart} = row.original as Task;
      return <div>{formatDateToString(dateStart)}</div>;
    },
  },
  {
    accessorKey: "dateDeliver",
    header: "Fecha Límite",
    cell: ({ row }) => {
      const {dateDeliver}= row.original as Task;
      return <div>{formatDateToString(dateDeliver)}</div>;
    },
  },
  {
    accessorKey: "priority",
    header: "Prioridad",
    cell: ({ row }) => {
      const { prioridad } = row.original as Task;
      return (
        <span
          className={cn(
            "capitalize priority-tag",
            prioridad && (prioridad.toUpperCase() === "ALTA") && "priority-high",
            prioridad && (prioridad.toUpperCase() === "MEDIA") && "priority-medium",
            prioridad && (prioridad.toUpperCase() === "BAJA") && "priority-low"
          )}
        >
          {prioridad}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const {description} = row.original as Task;
      return <div className="truncate w-52">{description}</div>;
    },
  },
];
