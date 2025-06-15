import { useGetTaskById } from "@/hooks/queries/task.query";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog";
import { Loader2 } from "lucide-react";
import { TaskForm } from "../forms/TaskForm";

interface TaskModalFormProps {
  onClose: () => void;
  mode: "create" | "edit";
  isOpen: boolean;
  taskId: number | null;
}

export function TaskModalForm({
  onClose,
  mode,
  isOpen,
  taskId,
}: TaskModalFormProps) {
  const { data, isPending, isError } = useGetTaskById(taskId);
  console.log(data)
  const title = mode === "create" ? "Nueva Tarea" : "Editar Tarea";
  const description =
  mode === "create"
    ? "Completa el formulario para registrar una nueva tarea."
    : "Modifica los campos necesarios para actualizar la tarea.";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {mode == "edit" && isPending && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {mode === "edit" && isError && (
          <div className="text-destructive text-center py-4">
            Error al cargar el usuario.
          </div>
        )}

        {(mode === "create" || (mode === "edit" && data)) && (
          <TaskForm mode={mode} onClose={onClose} task={data?.activity} />
        )}
      </DialogContent>
    </Dialog>
  );
}
