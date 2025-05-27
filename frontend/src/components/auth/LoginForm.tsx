import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutaion } from "@/hooks/mutations/auth.mutation";

const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo electrónico es requerido" })
    .email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .max(20, { message: "La contraseña no debe sobrepasar los 20 carácteres" }),
});

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync, error: errorLogin, isPending } = useLoginMutaion();
  const onFormSubmit = async (
    loginFormData: z.infer<typeof userLoginSchema>
  ) => {
    mutateAsync(loginFormData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit, (errors) => {
          console.log(errors);
        })}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Ingresa tu correo electrónico y contraseña para acceder a tu cuenta.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="eg ejemplo@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Si olvidaste tu contraseña solícita ayuda al equipo técnico
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Cargando..." : "Enviar"}
          </Button>
          {errorLogin && (
            <p className="text-center text-destructive">{errorLogin.message}</p>
          )}
        </div>
      </form>
    </Form>
  );
}
