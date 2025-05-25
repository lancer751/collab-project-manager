import { UserLoginData } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { fallback } from "@/routes";

export function useLoginMutaion() {
  const { setUser, loginUser } = useAuth();
  const LoginRoute = getRouteApi("/");
  const navigate = LoginRoute.useNavigate();
  const router = useRouter();
  const search = LoginRoute.useSearch();

  return useMutation({
    mutationFn: async (userData: UserLoginData) => loginUser(userData),
    onSuccess: async () => {
      await router.invalidate()
      navigate({from: "/", to: search.redirect || fallback})
    },
    onError: () => setUser(null)
  });
}
