import type { ColumnDef } from "@tanstack/react-table";
import { CircleSmall, Delete, Edit, PanelBottomOpen } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

import { Project } from "@/types/project.types";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { getRouteApi, Link, useLocation } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useDeleteProject } from "@/hooks/mutations/project.mutation";

export const ProjectNameCell = ({
  project,
  onEdit,
}: {
  project: Project;
  onEdit: (projectId: number) => void;
}) => {
  const { mutateAsync: deleteProject, isPending } = useDeleteProject();
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "flex items-center group relative",
            isPending && "pointer-events-none"
          )}
        >
          <Link
            to={currentPath}
            search={prev => ({
              ...prev,
              prjt: project.id,
            })}
            className={cn(
              "truncate max-w-72 hover:underline",
              isPending && "text-muted-foreground"
            )}
            disabled={isPending}
            resetScroll={false}
          >
            {project.name}
          </Link>
          <Button
            size={"sm"}
            className="absolute top-1/2 -translate-y-1/2 right-0 hidden group-hover:inline-flex z-20"
            disabled={isPending}
          >
            <PanelBottomOpen />
            Ver
          </Button>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onEdit(project.id)}>
          <Edit /> Editar
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => deleteProject(project.id)}
          variant="destructive"
        >
          <Delete /> Eliminar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const ProjectColumns = ({
  onEdit,
}: {
  onEdit: (projectId: number) => void;
}): ColumnDef<Project>[] => [
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
    header: "Proyectos",
    cell: ({ row }) => {
      const project = row.original as Project;
      return <ProjectNameCell project={project} onEdit={onEdit} />;
    },
  },
  {
    accessorKey: "stateDto",
    header: "Estado",
    cell: ({ row }) => {
      const { stateDto: status } = row.original as Project;
      return (
        <span
          className={cn(
            "project-tag-status",
            status.name === "Completado" && "project-completed",
            status.name === "Cancelado" && "project-canceled",
            status.name === "Curso" && "project-inprogress",
            status.name === "Pausa" && "project-paused",
            status.name === "Riesgo" && "project-inrisk"
          )}
        >
          <CircleSmall size={16} className="fill-current" />
          {status.name}
        </span>
      );
    },
  },

  {
    accessorKey: "userLider",
    header: "Lider del Proyecto",
    cell: ({ row }) => {
      const { userLiders } = row.original as Project;
      return (
        <div className="flex items-center gap-2">
          {userLiders.length > 0 && (
            <span className="rounded-md px-2 py-1 border w-max">{`${userLiders[0].name} ${userLiders[0].lastname}`}</span>
          )}
          {userLiders.length > 1 && (
            <span className="w-7 rounded-full h-7 items-center  justify-center flex border">
              +1
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "dateStart",
    header: "Fecha de inicio",
    cell: ({ row }) => {
      const project = row.original as Project;
      const dateInstace = new Date(project.dateStart);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formatdDate = new Intl.DateTimeFormat("es-ES", options).format(
        dateInstace
      );
      return <div>{formatdDate}</div>;
    },
  },
  {
    accessorKey: "dateDeliver",
    header: "Fecha Límite",
    cell: ({ row }) => {
      const project = row.original as Project;
      const dateInstace = new Date(project.dateStart);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formatdDate = new Intl.DateTimeFormat("es-ES", options).format(
        dateInstace
      );
      return <div>{formatdDate}</div>;
    },
  },
  {
    accessorKey: "priority",
    header: "Prioridad",
    cell: ({ row }) => {
      const { priority } = row.original as Project;
      return (
        <span
          className={cn(
            "capitalize priority-tag",
            priority === "ALTA" && "priority-high",
            priority === "MEDIA" && "priority-medium",
            priority === "BAJA" && "priority-low"
          )}
        >
          {priority}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      const project = row.original as Project;
      return <div className="truncate w-52">{project.description}</div>;
    },
  },
  {
    accessorKey: "createdBy",
    header: "Creado Por",
    cell: ({ row }) => {
      const project = row.original as Project;
      return <div>{project.createdBy}</div>;
    },
  },
  {
    accessorKey: "userRolProjectRequestList",
    header: "Colaboradores",
    cell: ({ row }) => {
      const { userRolProjectRequestList } = row.original as Project;
      return (
        <div className="flex items-center gap-2">
          {userRolProjectRequestList.length > 0 && (
            <span className="rounded-md px-2 py-1 border w-max">{`${userRolProjectRequestList[0].name} ${userRolProjectRequestList[0].lastname}`}</span>
          )}
          {userRolProjectRequestList.length > 1 && (
            <span className="w-7 rounded-full h-7 items-center  justify-center flex border">
              +1
            </span>
          )}
        </div>
      );
    },
  },
];
