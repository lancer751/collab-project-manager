import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { fallback, Route as LoginRoute } from "@/routes";
import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserLoginData } from "@/types/auth.types";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = LoginRoute.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const search = LoginRoute.useSearch();

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries())
      console.log(data)
      if(!formData.get("email")) return

      const userData: UserLoginData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string
      }
      
      await auth.loginUser(userData)

      await router.invalidate()
      
      await navigate({to: search.redirect || fallback})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Ingresa tu correo y contraseña para acceder a tu cuenta.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Usuario</Label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="e.g: juancarlos432"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a href="#">Olvidaste tu contraseña?</a> */}
          </div>
          <Input type="password" name="password" id="password" required />
        </div>
        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
}
