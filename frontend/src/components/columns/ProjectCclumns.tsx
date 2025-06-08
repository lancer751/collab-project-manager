import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Rol } from "@/types/roles.types";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Project } from "@/types/project.types";
import { format } from "date-fns";

export const ProjectColumns = (): ColumnDef<Project>[] => [
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
    header: "Nombre",
    cell: ({ row }) => {
      const project = row.original as Project;
      return <div className="capitalize">{project.name}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "stateDto",
    header: "Descripción",
    cell: ({ row }) => {
      const project = row.original as Project;
      return <div>{project.stateDto.name}</div>;
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
    accessorKey: "dateStart",
    header: "Fecha de inicio",
    cell: ({ row }) => {
      const project = row.original as Project;
      const formatdDate = format(project.dateStart, "dd/MM/yyyy");
      return <div>{formatdDate}</div>;
    },
  },
  {
    accessorKey: "dateDeliver",
    header: "Fecha Límite",
    cell: ({ row }) => {
      const project = row.original as Project;
      const formatdDate = format(project.dateStart, "dd/MM/yyyy");
      return <div>{formatdDate}</div>;
    },
  },
];
