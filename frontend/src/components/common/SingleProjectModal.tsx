import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSingleProjectById } from "@/hooks/queries/projects.query";
import { cn } from "@/lib/utils";
import { CircleSmall, Send, Target } from "lucide-react";
import AvatarGroup from "./AvatarGroup";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { generateRandomComments } from "@/helpers/utils/randomComments";
import { useMemo } from "react";
interface singleProjectModalProps {
  projectId: number;
  onClose: (open: boolean) => void;
}

export function SingleProjectModal({
  projectId,
  onClose,
}: singleProjectModalProps) {
  const { data: fullProjectData } = useSingleProjectById(projectId);
  const comments = useMemo(
    () =>
      fullProjectData &&
      fullProjectData.project.userRolProjectRequestList.length > 0
        ? generateRandomComments(10)
        : [],
    [fullProjectData]
  );

  return (
    <Dialog open onOpenChange={(open) => onClose(open)}>
      {fullProjectData && (
        <DialogContent className="sm:max-w-3xl md:max-w-6xl min-h-[356px] h-[550px] flex overflow-y-hidden p-0 divide-y-2 gap-0">
          <div className="flex flex-1 divide-x-2">
            {/* left side column */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-6 flex-1 space-y-7 text-sm overflow-auto h-full">
                <DialogTitle className="text-2xl inline-flex gap-2 items-center">
                  <Target />
                  {fullProjectData.project.name}
                </DialogTitle>
                {/* details */}
                <div className="overflow-y-auto space-y-8">
                  <div className="grid grid-flow-col grid-cols-2 gap-4">
                    {/* left side */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Estado</span>
                        <span
                          className={cn(
                            "project-tag-status text-sm",
                            fullProjectData.project.stateDto.name ===
                              "Completado" && "project-completed",
                            fullProjectData.project.stateDto.name ===
                              "Cancelado" && "project-canceled",
                            fullProjectData.project.stateDto.name === "Curso" &&
                              "project-inprogress",
                            fullProjectData.project.stateDto.name === "Pausa" &&
                              "project-paused",
                            fullProjectData.project.stateDto.name ===
                              "Riesgo" && "project-inrisk"
                          )}
                        >
                          <CircleSmall size={16} className="fill-current" />
                          {fullProjectData.project.stateDto.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Líder</span>
                        <AvatarGroup
                          limit={5}
                          avatars={fullProjectData.project.userLiders}
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Fecha de Inicio</span>
                        <span className="text-muted-foreground">
                          {new Date(
                            fullProjectData.project.dateStart
                          ).toDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Fecha Límite</span>
                        <span className="text-muted-foreground">
                          {new Date(
                            fullProjectData.project.dateDeliver
                          ).toDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Colaboradores</span>
                        <AvatarGroup
                          limit={5}
                          avatars={
                            fullProjectData.project.userRolProjectRequestList
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">Prioridad</span>
                        <span
                          className={cn(
                            "capitalize priority-tag",
                            fullProjectData.project.priority === "ALTA" &&
                              "priority-high",
                            fullProjectData.project.priority === "MEDIA" &&
                              "priority-medium",
                            fullProjectData.project.priority === "BAJA" &&
                              "priority-low"
                          )}
                        >
                          {fullProjectData.project.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* project description */}
                  <div className="flex flex-col justify-center gap-2">
                    <span className="font-semibold">Descripción</span>
                    <p className="text-muted-foreground text-[1rem]">
                      {fullProjectData.project.description}
                    </p>
                  </div>

                  {/* Actividad JSON solo para ejemplo */}
                  <pre className="text-xs">
                    {JSON.stringify(fullProjectData.activity, null, 2)}
                  </pre>
                  <div>Tareas</div>
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
