import { CreateUserDto, SingleUserData } from "@/types/user.types";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  useCreateNewUser,
  useUpdateSingleUser,
} from "@/hooks/mutations/user.mutation";
import { useGetAllRols } from "@/hooks/queries/roles";
interface UserFormProps {
  user?: SingleUserData;
  mode: "create" | "edit";
  onClose: () => void;
}

const createUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El/los nombre(s) es requerido" })
    .max(20, { message: "El nombre debe tener máximo 20 caracteres" }),
  lastname: z.string().min(1, { message: "Los apellidos son requeridos" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 carácteres" })
    .max(20),
  email: z.string().email({ message: "Correo eléctronico no válido" }),
  description: z.string().optional(),
  numberPhone: z
    .string()
    .max(9, { message: "El teléfono debe tener 9 carácteres como máximo" })
    .optional(),
  rolDtoList: z.enum(
    ["ROLE_ADMIN", "ROLE_LIDER_SISTEMAS", "ROLE_LIDER_SOFTWARE", "ROLE_USER", "ROLE_LIDER_PROYECTO"],
    { required_error: "Selecciona el Rol que tendrá el usuario" }
  ),
  entryDate: z.date({
    invalid_type_error: "Provee un dia valido",
    required_error: "La fecha de ingreso es requerida.",
  }),
});

const editUserSchema = createUserSchema.omit({ password: true }).extend({
  password: z.string().min(8).max(20).optional(),
});

export function UserForm({ user, mode, onClose }: UserFormProps) {
  const { mutateAsync: createUser } = useCreateNewUser({ onClose });
  const { mutateAsync: editSingleUser } = useUpdateSingleUser({ onClose });
  const {data: rols, isPending} = useGetAllRols()
  // Elegimos el schema según el modo
  const schema = mode === "create" ? createUserSchema : editUserSchema;
  type FormSchema = z.infer<typeof schema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          numberPhone: user.numberPhone ?? "",
          password: user.password,
          rolDtoList: user.rolDtoList[0].name,
          description: user.description ?? "",
          entryDate: user.entryDate ? new Date(user.entryDate) : new Date(),
        }
      : undefined,
  });

  async function onSubmitUserData(userData: FormSchema) {
    console.log("enviando datos..");
    console.log(userData);
    const formatted = {
      ...userData,
      rolDtoList: [{ name: userData.rolDtoList }],
      description: userData.description ?? null,
      numberPhone: userData.numberPhone ?? null,
    };

    if (user && mode === "edit") {
      await editSingleUser({ userId: user.id, userData: formatted });
      return;
    }
    await createUser(formatted as CreateUserDto);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitUserData, (errors) => {
          console.log(errors);
        })}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="ejm: 987432789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Agrega información adicional sobre el usuario"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-3">
          <FormField
            control={form.control}
            name="rolDtoList"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Que Rol tendrá?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ROLE_ADMIN">Administrador</SelectItem>
                    <SelectItem value="ROLE_LIDER_SISTEMAS">
                      Lider de Sistemas
                    </SelectItem>
                    <SelectItem value="ROLE_LIDER_SOFTWARE">
                      Lider de Software
                    </SelectItem>
                    <SelectItem value="ROLE_USER">Usuario</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de ingreso</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[200px] pl-3 text-left font-normal",
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
                        date > new Date() || date < new Date("2000-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              {mode === "edit" && (
                <FormDescription>
                  Establece una nueva contraseña para este usuario.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {mode === "edit" ? "Guardar Cambios" : "Crear Usuario"}
        </Button>
      </form>
    </Form>
  );
}
