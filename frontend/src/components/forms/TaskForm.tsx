import { useCreateTask, useEditTask } from "@/hooks/mutations/task.mutation";
import { useInfiniteUsers } from "@/hooks/queries/users";
import { Task } from "@/types/task.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { useInfiniteTask } from "@/hooks/queries/task.query";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { useProjectsSummary } from "@/hooks/queries/projects.query";
import { formatDateToString } from "@/helpers/utils/formatDate";
import { Project } from "@/types/project.types";

export const CreateTaskSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  dateStart: z.coerce.date({
    required_error: "Fecha de inicio requerida",
    invalid_type_error: "Fecha inválida",
  }),
  dateDeliver: z.coerce.date({
    required_error: "Fecha de entrega requerida",
    invalid_type_error: "Fecha inválida",
  }),
  prioridad: z.enum(["BAJA", "MEDIA", "ALTA"], {
    errorMap: () => ({ message: "priority debe ser 'BAJA', 'MEDIA' o 'ALTA'" }),
  }),
  activityFatherId: z.number().nullable(),
  state: z.object({
    name: z.enum(["Completado", "Curso", "Pausa", "Riesgo", "Cancelado"], {
      errorMap: () => ({ message: "state.name inválido" }),
    }),
  }),
  idProject: z.number(),
  usersList: z.array(z.number().int().positive(), {
    invalid_type_error: "usersList debe ser un array de IDs numéricos",
  }),
});

interface TaskFormProps {
  task?: Task;
  project?:  Pick<Project, "id" | "name">
  mode: "edit" | "create";
  onClose: () => void;
}

export function TaskForm({ task, mode, onClose, project }: TaskFormProps) {
  type TaskFormSchema = z.infer<typeof CreateTaskSchema>;
  const { data: taskData } = useInfiniteTask();
  const tasks = useMemo(() => {
    return taskData ? taskData.pages.flatMap((page) => page?.activities ?? []) : [];
  }, [taskData]);

  const { data: projects = [] } = useProjectsSummary();
  const { data } = useInfiniteUsers({ filters: {}, sorters: {} });
  const users = useMemo(() => {
    return data
      ? data.pages.flatMap((page) => page?.users ?? []).splice(0, 7)
      : [];
  }, [data]);

  const { mutateAsync: createNewTask, isPending: creating } = useCreateTask();
  const {mutateAsync: editTask, isPending: editing} = useEditTask()
  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: task ? {
      name: task.name,
      description: task.description,
      dateStart: task.dateStart,
      dateDeliver: task.dateDeliver,
      prioridad: task.prioridad,
      activityFatherId: task.activityFatherId,
      state: task.state,
      idProject: project?.id,
      usersList: task.users.map(u => u.id),
    } :
     {
      name: "",
      description: "",
      dateStart: undefined,
      dateDeliver: undefined,
      prioridad: "BAJA",
      activityFatherId: null,
      state: { name: "Curso" },
      idProject: undefined,
      usersList: [],
    },
  });

  // Helpers para combobox de usuarios
  const [openUsers, setOpenUsers] = useState(false);
  function toggleUser(u: { id: number; email: string }) {
    const current = form.getValues("usersList");
    if (current.includes(u.id)) {
      form.setValue(
        "usersList",
        current.filter((id) => id !== u.id)
      );
    } else {
      form.setValue("usersList", [...current, u.id]);
    }
  }


  async function onSubmit(data: TaskFormSchema) {
    console.log(data);
    if (mode === "edit" && task) {
      await editTask({ taskData: data, id: task.id  });
      onClose()
    } else {
      await createNewTask(data);
    }
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Título de la tarea" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  className="resize-none"
                  placeholder="Detalles..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Proyecto */}
        <FormField
          name="idProject"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proyecto</FormLabel>
              <FormControl>
                <Select
                  value={String(field.value ?? "")}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects && projects.length === 0 && (
                      <div className="w-full flex justify-center items-center">
                        <Loader2 className="animate-spin" />
                      </div>
                    )}
                    {projects?.map((pr) => (
                      <SelectItem key={pr.id} value={pr.id.toString()}>
                        {pr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Estado */}
        <FormField
          name="state.name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Curso",
                      "Completado",
                      "Pausa",
                      "Riesgo",
                      "Cancelado",
                    ].map((st) => (
                      <SelectItem key={st} value={st}>
                        {st}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Prioridad */}
        <FormField
          name="prioridad"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridad</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    {["BAJA", "MEDIA", "ALTA"].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Usuarios */}
        <FormField
          name="usersList"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asignar usuarios</FormLabel>
              <Popover open={openUsers} onOpenChange={setOpenUsers}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {field.value.length
                      ? `${field.value.length} seleccionado(s)`
                      : "Seleccionar usuarios"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <Command>
                    <CommandInput placeholder="Buscar usuarios..." />
                    <CommandList>
                      <CommandEmpty>No hay usuarios.</CommandEmpty>
                      <CommandGroup>
                        {users.map((u) => (
                          <CommandItem
                            key={u.id}
                            onSelect={() => toggleUser(u)}
                          >
                            <span>{`${u.name} ${u.lastname}`}</span>
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value.includes(u.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actividad padre */}
        <FormField
          name="activityFatherId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Actividad padre (opcional)</FormLabel>
              <Select
                // Si no hay valor, dejo `undefined` para que aparezca el placeholder
                value={field.value != null ? String(field.value) : undefined}
                onValueChange={(v) => {
                  // Mapeo el valor centinela "none" a null
                  field.onChange(v === "none" ? null : Number(v));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ninguna" />
                </SelectTrigger>
                <SelectContent>
                  {/* opción para no padre con valor NO vacío */}
                  <SelectItem value="none">Ninguna</SelectItem>

                  {/* Loader */}
                  {tasks == null ? (
                    <div className="w-full flex justify-center py-2">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    tasks.map((tsk) => (
                      <SelectItem key={tsk.id} value={String(tsk.id)}>
                        {tsk.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fecha Inicio */}
        <FormField
          name="dateStart"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha Inicio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(!field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? formatDateToString(field.value)
                        : "Seleccionar fecha/hora"}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fecha Entrega */}
        <FormField
          name="dateDeliver"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha Entrega</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(!field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? formatDateToString(field.value)
                        : "Seleccionar fecha/hora"}
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={creating || editing} className="w-full">
          {mode === "create" ? "Crear Tarea" : "Guardar cambios"}
        </Button>
      </form>
    </Form>
  );
}
