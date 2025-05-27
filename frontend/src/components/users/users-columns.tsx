import { User } from "@/types/user.types";
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

export const UsersColumns = ({
  onEdit,
}: {
  onEdit: (userId: number) => void;
}): ColumnDef<User>[] => [
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
    header: "Nombres y Apellidos",
    cell: ({ row }) => {
      const user = row.original as User;

      return (
        <div className="capitalize">
          {user.name.concat(", ", user.lastname)}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "rolDtoList",
    header: () => "Rol",
    cell: ({ row }) => {
      const rolObject = row.getValue("rolDtoList") as Rol[];
      return rolObject[0].name;
    },
  },
  {
    accessorKey: "numberPhone",
    header: () => <p className="text-center">Teléfono</p>,
    cell: ({ row }) => {
      const cellPhone = row.getValue("numberPhone");
      if (typeof cellPhone !== "string")
        return <p className="text-center">-</p>;
      return <p className="text-center">{cellPhone}</p>;
    },
  },
  {
    accessorKey: "entryDate",
    header: () => <div className="text-center">Fecha de ingreso</div>,
    cell: ({ row }) => {
      const entryDate = row.getValue("entryDate") as Date;
      const dateInstace = new Date(entryDate);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formatedEntryDate = new Intl.DateTimeFormat(
        "es-ES",
        options
      ).format(dateInstace);

      return <div className="text-center">{formatedEntryDate}</div>;
    },
  },
  {
    accessorKey: "active",
    header: () => <div className="text-center">Estado</div>,
    cell: ({ row }) => {
      const status = row.getValue("active") as boolean;
      return (
        <div className="text-center">{status ? "Activo" : "Retirado"}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver Usuario</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(user.id)}>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
