import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UserForm } from "../forms/UserForm";
import { useSingleUserById } from "@/hooks/queries/users";
import { Loader2 } from "lucide-react";

interface ModalFormUserProps {
  onClose: () => void;
  mode: "create" | "edit";
  isOpen: boolean;
  userId: number | null;
}

export function ModalFormUser({
  onClose,
  mode,
  isOpen,
  userId,
}: ModalFormUserProps) {
  const {
    data: user,
    isPending: isUserPeding,
    isError: isErrorGetUser,
  } = useSingleUserById(userId);
  const title = mode === "create" ? "Agregar Nuevo Usuario" : "Editar Usuario";
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
        {/* loading state */}
        {mode == "edit" && isUserPeding && (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error state*/}
        {mode === "edit" && isErrorGetUser && (
          <div className="text-destructive text-center py-4">
            Error al cargar el usuario.
          </div>
        )}

        {(mode === "create" || (mode === "edit" && user)) && (
          <UserForm mode={mode} onClose={onClose} user={user} />
        )}
      </DialogContent>
    </Dialog>
  );
}
