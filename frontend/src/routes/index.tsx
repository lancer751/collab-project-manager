import LoginForm from "@/components/auth/LoginForm";
import {
  createFileRoute,
  Link,
  redirect,
} from "@tanstack/react-router";
import { z } from "zod";

export const fallback = "/dashboard/inicio" as const;

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: async ({ context, search }) => {
    const {auth} = context
    const authenticated = await auth.isAuthenticated()
    console.log(authenticated)
    if (authenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:py-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex gap-2 font-medium items-center">
            <img src="logo.png" alt="logo" className="h-10 w-10" />
            Mescob S.A.C
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="bg-black/30 absolute inset-0 z-10"></div>
        <img
          src="/images/working-area.avif"
          alt="working-area"
          className="h-full w-full absolute inset-0 object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
