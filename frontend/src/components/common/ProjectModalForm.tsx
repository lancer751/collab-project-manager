import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ProjectForm } from "../forms/ProjectForm";
import { useSingleProjectById } from "@/hooks/queries/projects.query";
import { Loader2 } from "lucide-react";

interface ModalFormUserProps {
  onClose: () => void;
  mode: "create" | "edit";
  isOpen: boolean;
  projectId: number | null;
}

export function ProjectModalForm({
  onClose,
  mode,
  isOpen,
  projectId,
}: ModalFormUserProps) {
  const { data, isPending, isError } = useSingleProjectById(projectId);
  const title = mode === "create" ? "Nuevo Proyecto" : "Editar Projecto";
  const description =
    mode === "create"
      ? "Completa el formulario para registrar un nuevo usuario en el sistema."
      : "Modifica los campos necesarios para actualizar la información del usuario.";
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
          <ProjectForm mode={mode} onClose={onClose} project={data?.project} />
        )}
      </DialogContent>
    </Dialog>
  );
}
