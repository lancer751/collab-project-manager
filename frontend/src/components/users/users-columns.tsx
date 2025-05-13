import { User } from "@/types/user.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Rol } from "@/types/roles.types";

export const UsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Nombres y Apellidos</div>,
    cell: ({row}) => {
      const user = row.original as User

      return <div className="capitalize">{user.name.concat(", ", user.lastname)}</div>
    }
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Gmail</div>,
  },
  {
    accessorKey: "rolDtoList",
    header: () => <div className="text-center">Rol</div>,
    cell: ({row}) => {
      const rolObject = row.getValue("rolDtoList") as Rol[]
      return <div className="text-center">{rolObject[0].name}</div>
    }
  },
  {
    accessorKey: "numberPhone",
    header: () => <div className="text-center">Teléfono</div>,
    cell: ({ row }) => {
      const cellPhone = row.getValue("numberPhone");
      if (typeof cellPhone !== "string")
        return <div className="text-center">-</div>;
      return <div className="text-center">{cellPhone}</div>;
    },
  },
  {
    accessorKey: "entryDate",
    header: () => <div className="text-center">Fecha de ingreso</div>,
    cell: ({row}) => {
      const entryDate = row.getValue("entryDate") as Date
      const dateInstace = new Date(entryDate)
      const options: Intl.DateTimeFormatOptions = {day: "numeric", month: "long", year: "numeric"}
      const formatedEntryDate = new Intl.DateTimeFormat("es-ES", options).format(dateInstace)

      return formatedEntryDate
    }
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
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
