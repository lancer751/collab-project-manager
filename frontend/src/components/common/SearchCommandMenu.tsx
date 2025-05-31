import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { Command, SquareCheck, Target } from "lucide-react";

export default function SearchCommandMenu() {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleDown);
    return () => document.removeEventListener("keydown", handleDown);
  }, []);
  return (
    <>
      <Button variant={"outline"} onClick={() => setOpen(true)}>
        Buscar proyectos o tareas...
        <span className="inline-flex items-center text-xs gap-0.5 text-secondary bg-secondary-foreground p-1 rounded-md">
          <Command /> Ctrl+K
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Sistema de asistencias, Realizar un backup de la base de datos..." />
        <div className="w-full flex gap-2 px-2 py-3 overflow-x-auto">
          <Button size={"sm"} variant={"outline"} className="inline-block px-2 py-1.5 border border-secondary rounded-md text-xs">Persona asignada</Button>
          <Button size={"sm"} variant={"outline"} className="inline-block px-2 py-1.5 border border-secondary rounded-md text-xs">Fecha de finalización</Button>
        </div>
        <CommandList>
          <CommandEmpty>No hay resultados encontrados</CommandEmpty>
          <CommandGroup heading="Resultados">
            <CommandItem><Target/>Sistema de asistencias Grupo Sam E.I.R.L</CommandItem>
            <CommandItem><Target/>E-commerce online Yackot</CommandItem>
            <CommandItem><Target/>Página web Eut et veritas</CommandItem>
            <CommandItem><SquareCheck/>Desplegar en un servidor local</CommandItem>
            <CommandItem><SquareCheck/>Refactorizar lógica de permisos de usuarios</CommandItem>
            <CommandItem><SquareCheck/>Reunión con el cliente</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
