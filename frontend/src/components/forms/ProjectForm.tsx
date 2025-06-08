import { Project, UserRolProjectRequestList } from "@/types/project.types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { useMemo, useState } from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { useInfiniteUsers } from "@/hooks/queries/users";
import { useCreateProject } from "@/hooks/mutations/project.mutation";

const userSchema = z.object({
  id: z.number(),
  email: z.string().email({ message: "Email no válido" }),
  rolProject: z.enum(["Lider", "Colaborador"]),
});

const projectSchema = z.object({
  name: z.string().min(1, { message: "Este campo es requerido" }),
  description: z.string().optional(),
  stateDto: z.object({
    name: z.enum(["Completado", "Curso", "Pausa", "Riesgo", "Cancelado"], {
      message: "Selecciona el estado del proyecto",
    }),
  }),
  dateStart: z.coerce.date({
    required_error: "Fecha de inicio requerida",
    invalid_type_error: "Fecha inválida",
  }),
  dateDeliver: z.coerce.date({
    required_error: "Fecha de entrega requerida",
    invalid_type_error: "Fecha inválida",
  }),
  priority: z.enum(["ALTA", "MEDIA", "BAJA"]),
  userLider: z.array(userSchema),
  userRolProjectRequestList: z.array(userSchema),
});

interface ProjectFormProps {
  project?: Project;
  mode: "edit" | "create";
  onClose: () => void;
}

export function ProjectForm({ mode, onClose, project }: ProjectFormProps) {
  type FormSchema = z.infer<typeof projectSchema>;
  const { mutateAsync: createNewProject } = useCreateProject();
  const { data } = useInfiniteUsers({ filters: {}, sorters: {} });
  const users = useMemo(() => {
    return data
      ? data.pages.flatMap((page) => page?.users ?? []).splice(0, 5)
      : [];
  }, [data]);
  console.log(users);
  const form = useForm<FormSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          name: project.name,
          description: project.description ?? "",
          dateStart: project.dateStart
            ? new Date(project.dateStart)
            : new Date(),
          dateDeliver: project.dateDeliver
            ? new Date(project.dateDeliver)
            : new Date(),
          priority: project.priority,
          stateDto: project.stateDto,
          userLider: project.userLider,
          userRolProjectRequestList: project.userRolProjectRequestList,
        }
      : {
          name: "",
          description: "",
          dateStart: undefined,
          dateDeliver: undefined,
          priority: "BAJA",
          stateDto: { name: "Curso" },
          userLider: [],
          userRolProjectRequestList: [],
        },
  });

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpenUsers = () => setOpen((open) => !open);
  function handleSelectLeader(user: UserRolProjectRequestList) {
    const selectedValues = form.getValues("userLider");
    if (!selectedValues) {
      form.setValue("userLider", [user]);
      return;
    }
    if (selectedValues.some((value) => value.id === user.id)) {
      const updatedUsers = selectedValues.filter((val) => val.id !== user.id);
      form.setValue("userLider", updatedUsers);
    } else {
      form.setValue("userLider", [...selectedValues, user]);
    }
  }

  function handleSelectColabs(user: UserRolProjectRequestList) {
    const selectedValues = form.getValues("userRolProjectRequestList");
    if (!selectedValues) {
      form.setValue("userRolProjectRequestList", [user]);
      return;
    }
    if (selectedValues.some((value) => value.id === user.id)) {
      const updatedUsers = selectedValues.filter((val) => val.id !== user.id);
      form.setValue("userRolProjectRequestList", updatedUsers);
    } else {
      form.setValue("userRolProjectRequestList", [...selectedValues, user]);
    }
  }

  async function onSubmitProjectData(projectData: FormSchema) {
    await createNewProject(projectData);
    onClose()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitProjectData, (errors) => {
          console.log(errors);
        })}
        className="space-y-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="tienda online, página web de artículos, ecommerce de ropa..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                  placeholder="Agregar más información sobre el proyecto"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="stateDto"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                value={field.value?.name ?? ""}
                onValueChange={(value) => field.onChange({ name: value })}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar un estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="Curso">En Curso</SelectItem>
                  <SelectItem value="Riesgo">En Riesgo</SelectItem>
                  <SelectItem value="Pausa">En Pausa</SelectItem>
                  <SelectItem value="Cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="priority"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prioridad</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar Prioridad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BAJA">Baja</SelectItem>
                  <SelectItem value="MEDIA">Media</SelectItem>
                  <SelectItem value="ALTA">Alta</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* seleccting the lider for the project */}
        <FormField
          name="userLider"
          control={form.control}
          render={({ field }) => {
            console.log("userLider", field.value);
            return (
              <FormItem>
                <FormLabel>Líder de Equipo</FormLabel>
                <Popover open={open} onOpenChange={handleOpenUsers}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="secondary"
                        role="combobox"
                        type="button"
                        className="max-w-max px-3 py-2 order-4"
                      >
                        Seleccionar
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <div className="flex flex-wrap gap-2 order-2">
                    {field.value &&
                      field.value.length > 0 &&
                      field.value.map(
                        (val, index) =>
                          index < 3 && (
                            <span
                              key={val.id}
                              className="rounded-md bg-primary-foreground px-2 py-1 inline-flex gap-1 items-center  text-sm"
                            >
                              {val.email}
                              <Button
                                onClick={() => handleSelectLeader(val)}
                                size={"icon"}
                                type="button"
                                className="cursor-pointer rounded-full w-5 h-5  bg-cyan-800 text-white hover:bg-slate-400 hover:bg-none group"
                              >
                                <X size={4} />
                              </Button>
                            </span>
                          )
                      )}
                    {field.value && field.value.length > 3 && (
                      <Button
                        type="button"
                        onClick={handleOpenUsers}
                        variant={"secondary"}
                        className="rounded-full w-5 h-5 p-4"
                      >
                        +3
                      </Button>
                    )}
                  </div>
                  <PopoverContent className="p-1" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar usuarios..." />
                      {/* show selected users in command content */}
                      {form.getValues("userLider")?.length > 0 && (
                        <>
                          <div className="w-full p-2 flex">
                            <ScrollArea className="flex flex-1 flex-wrap gap-2  max-h-20 overflow-y-auto">
                              {form.getValues("userLider")?.map((leader) => (
                                <span
                                  key={leader.id}
                                  className="inline-flex items-center gap-1.5 text-sm"
                                >
                                  {leader.email}
                                  <Button
                                    onClick={() => handleSelectLeader(leader)}
                                    size={"icon"}
                                    className="cursor-pointer rounded-full w-5 h-5  bg-cyan-800 text-white hover:bg-slate-400 hover:bg-none group"
                                  >
                                    <X size={4} />
                                  </Button>
                                </span>
                              ))}
                            </ScrollArea>
                            <div>
                              <Button
                                onClick={() => form.setValue("userLider", [])}
                                size={"icon"}
                                className="rounded-full w-5 h-5"
                              >
                                <X />
                              </Button>
                            </div>
                          </div>
                          <CommandSeparator />
                        </>
                      )}
                      <CommandList>
                        <CommandEmpty>
                          No hay usuarios disponibles.
                        </CommandEmpty>
                        <CommandGroup>
                          {users.map((u) => (
                            <CommandItem
                              value={u.email}
                              key={u.id}
                              onSelect={() =>
                                handleSelectLeader({
                                  id: u.id,
                                  email: u.email,
                                  rolProject: "Lider",
                                })
                              }
                            >
                              {u.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value &&
                                    field.value.some(
                                      (user) => user.email === u.email
                                    )
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
            );
          }}
        />
        {/* seleccting the colaborators for the project */}
        <FormField
          name="userRolProjectRequestList"
          control={form.control}
          render={({ field }) => {
            console.log("userRolProjectRequestList", field.value);
            return (
              <FormItem>
                <FormLabel>Colaboradores</FormLabel>
                <Popover
                  open={open2}
                  onOpenChange={() => setOpen2((prev) => !prev)}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="secondary"
                        role="combobox"
                        type="button"
                        className="max-w-max px-3 py-2 order-4"
                      >
                        Seleccionar
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <div className="flex flex-wrap gap-2 order-2">
                    {field.value &&
                      field.value.length > 0 &&
                      field.value.map(
                        (val, index) =>
                          index < 3 && (
                            <span
                              key={val.id}
                              className="rounded-md bg-primary-foreground px-2 py-1 inline-flex gap-1 items-center  text-sm"
                            >
                              {val.email}
                              <Button
                                onClick={() => handleSelectColabs(val)}
                                size={"icon"}
                                type="button"
                                className="cursor-pointer rounded-full w-5 h-5  bg-cyan-800 text-white hover:bg-slate-400 hover:bg-none group"
                              >
                                <X size={4} />
                              </Button>
                            </span>
                          )
                      )}
                    {field.value && field.value.length > 3 && (
                      <Button
                        type="button"
                        onClick={handleOpenUsers}
                        variant={"secondary"}
                        className="rounded-full w-5 h-5 p-4"
                      >
                        +3
                      </Button>
                    )}
                  </div>
                  <PopoverContent className="p-1" align="start">
                    <Command>
                      <CommandInput placeholder="Buscar usuarios..." />
                      {/* show selected users in command content */}
                      {form.getValues("userRolProjectRequestList")?.length >
                        0 && (
                        <>
                          <div className="w-full p-2 flex">
                            <ScrollArea className="flex flex-1 flex-wrap gap-2  max-h-20 overflow-y-auto">
                              {form
                                .getValues("userRolProjectRequestList")
                                ?.map((colab) => (
                                  <span
                                    key={colab.id}
                                    className="inline-flex items-center gap-1.5 text-sm"
                                  >
                                    {colab.email}
                                    <Button
                                      onClick={() => handleSelectColabs(colab)}
                                      size={"icon"}
                                      className="cursor-pointer rounded-full w-5 h-5  bg-cyan-800 text-white hover:bg-slate-400 hover:bg-none group"
                                    >
                                      <X size={4} />
                                    </Button>
                                  </span>
                                ))}
                            </ScrollArea>
                            <div>
                              <Button
                                onClick={() =>
                                  form.setValue("userRolProjectRequestList", [])
                                }
                                size={"icon"}
                                className="rounded-full w-5 h-5"
                              >
                                <X />
                              </Button>
                            </div>
                          </div>
                          <CommandSeparator />
                        </>
                      )}
                      <CommandList>
                        <CommandEmpty>
                          No hay usuarios disponibles.
                        </CommandEmpty>
                        <CommandGroup>
                          {users.map((u) => (
                            <CommandItem
                              value={u.email}
                              key={u.id}
                              onSelect={() =>
                                handleSelectColabs({
                                  id: u.id,
                                  email: u.email,
                                  rolProject: "Colaborador",
                                })
                              }
                            >
                              {u.email}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value &&
                                    field.value.some(
                                      (user) => user.email === u.email
                                    )
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
            );
          }}
        />
        <FormField
          control={form.control}
          name="dateStart"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de inicio</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateDeliver"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha Límite</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {mode === "create" ? "Crear Proyecto" : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
}
