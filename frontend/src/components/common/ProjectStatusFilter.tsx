import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "../ui/dropdown-menu";

export default function ProjectStatusFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"outline"} className="text-xs">
          Estado <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10} className="text-sm">
        <DropdownMenuCheckboxItem checked={true}>
          En Curso
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={true}>
          En Pausa
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={true}>
          Trabajo Acumulado
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={true}>
          Planificación
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={true}>
          Finalizado
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={true}>
          Cancelado
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
