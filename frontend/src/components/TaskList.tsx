import { CircleSmall, StickyNote } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Task } from "@/types/task.types";
import AvatarGroup from "./common/AvatarGroup";
import { formatDateToString } from "@/helpers/utils/formatDate";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: Task[] | null;
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      <h3 className="text-xl inline-flex gap-2 items-center font-semibold mb-4">
        <StickyNote /> Tareas
      </h3>
      <div className="space-y-4 w-full relative">
        <div className="w-full max-h-40 absolute top-0 left-0 overflow-x-auto">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Tareas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Asignado a</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Prioridad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(tasks ?? []).map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "project-tag-status",
                        task.state.name === "Completado" && "project-completed",
                        task.state.name === "Cancelado" && "project-canceled",
                        task.state.name === "Curso" && "project-inprogress",
                        task.state.name === "Pausa" && "project-paused",
                        task.state.name === "Riesgo" && "project-inrisk"
                      )}
                    >
                      <CircleSmall size={16} className="fill-current" />
                      {task.state.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AvatarGroup avatars={task.users} limit={5} />
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDateToString(task.dateStart)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatDateToString(task.dateDeliver)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        "capitalize priority-tag",
                        task.prioridad === "ALTA" && "priority-high",
                        task.prioridad === "MEDIA" && "priority-medium",
                        task.prioridad === "BAJA" && "priority-low"
                      )}
                    >
                      {task.prioridad}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {
                tasks?.length === 0 &&
                 <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="text-center text-muted-foreground">No hay tareas a realizar</TableCell>
                 </TableRow>
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
