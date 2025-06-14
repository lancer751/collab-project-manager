import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { generateRandomComments } from "@/helpers/utils/randomComments";
import { useGetTaskById } from "@/hooks/queries/task.query";
import { useMemo } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleSmall, Send, StickyNote } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { TaskList } from "../TaskList";
import { cn } from "@/lib/utils";
import AvatarGroup from "./AvatarGroup";
interface SingleTaskModalProps {
  taskId: number;
  onClose: (open: boolean) => void;
}

export function SingleTaskModal({ taskId, onClose }: SingleTaskModalProps) {
  const { data: task } = useGetTaskById(taskId);
  const comments = useMemo(
    () =>
      task && task.activity.users.length > 0
        ? generateRandomComments(Math.random() * 13)
        : [],
    [task]
  );

  return (
    <Dialog open onOpenChange={(open) => onClose(open)}>
      {task && (
        <DialogContent className="sm:max-w-3xl md:max-w-6xl min-h-[356px] h-[550px] flex overflow-hidden p-0 divide-y-2 gap-0">
          <div className="flex flex-1 divide-x-2">
            {/* left side column */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
              <div className="p-6 flex-1 space-y-7 text-sm overflow-auto h-full">
                <DialogTitle className="text-2xl inline-flex gap-2 items-center">
                  <StickyNote />
                  {task.activity.name}
                </DialogTitle>
                {/* details */}
                <div className="overflow-y-auto overflow-x-hidden space-y-8 h-full">
                  <div className="grid grid-flow-col grid-cols-2 gap-4">
                    {/* left side */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Estado</span>
                        <span
                          className={cn(
                            "project-tag-status text-sm",
                            task.activity.state.name ===
                              "Completado" && "project-completed",
                            task.activity.state.name ===
                              "Cancelado" && "project-canceled",
                            task.activity.state.name === "Curso" &&
                              "project-inprogress",
                            task.activity.state.name === "Pausa" &&
                              "project-paused",
                            task.activity.state.name ===
                              "Riesgo" && "project-inrisk"
                          )}
                        >
                          <CircleSmall size={16} className="fill-current" />
                          {task.activity.state.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Asignado a</span>
                        <AvatarGroup
                          limit={5}
                          avatars={task.activity.users}
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Fecha de Inicio</span>
                        <span className="text-muted-foreground">
                          {new Date(
                            task.activity.dateStart
                          ).toDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Fecha Límite</span>
                        <span className="text-muted-foreground">
                          {new Date(
                            task.activity.dateDeliver
                          ).toDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Prioridad</span>
                        <span
                          className={cn(
                            "capitalize priority-tag",
                            task.activity.prioridad === "ALTA" &&
                              "priority-high",
                            task.activity.prioridad === "MEDIA" &&
                              "priority-medium",
                            task.activity.prioridad === "BAJA" &&
                              "priority-low"
                          )}
                        >
                          {task.activity.prioridad}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Proyecto</span>
                        <span
                          className="text-muted-foreground"
                        >
                          {task.project.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* task description */}
                  <div className="flex flex-col justify-center gap-2">
                    <span className="font-semibold">Descripción</span>
                    <p className="text-muted-foreground text-[1rem]">
                      {task.activity.description}
                    </p>
                  </div>

                  {/* Actividad JSON solo para ejemplo */}

                  <TaskList tasks={task.activity.subtasks} />
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="w-[400px] flex flex-col border-l overflow-hidden">
              <div className="h-12 px-4 flex items-center justify-between bg-background border-b">
                <h2 className="text-xl font-semibold">Actividad</h2>
              </div>

              {/* Scrollable */}
              <div className="flex-1 overflow-auto">
                <ScrollArea className="h-full px-4 pt-4">
                  <div className="flex flex-col gap-2">
                    {/* Commetns */}
                    {comments.length > 0 ? (
                      comments.map(({ id, user, time, text }) => (
                        <div
                          key={id}
                          className="bg-primary-foreground p-3 rounded-lg flex items-start space-x-3"
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between text-sm font-medium">
                              <span>{user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {time}
                              </span>
                            </div>
                            <p className="mt-1 text-sm">{text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-center text-sm">
                        No hay comentarios recientes
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Footer */}
              <div className="h-14 px-4 border-t flex items-center gap-2">
                <Input
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Escribe un comentario…"
                />
                <Button size={"sm"}>
                  Enviar <Send />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
