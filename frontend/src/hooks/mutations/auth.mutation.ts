import { UserLoginData } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../useAuth";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { fallback } from "@/routes";

export function useLoginMutaion() {
  const { setUser, login } = useAuth();
  const LoginRoute = getRouteApi("/");
  const navigate = LoginRoute.useNavigate();
  const router = useRouter();
  const search = LoginRoute.useSearch();

  return useMutation({
    mutationFn: async (userData: UserLoginData) => login(userData),
    onSuccess: async (currentUser, variables, context) => {
      setUser(currentUser)
      await router.invalidate()
      navigate({from: "/", to: search.redirect || fallback})
    },
    onError: () => setUser(null)
  });
}

export function useLogoutMutation() {
  const {setUser, logoutSession} = useAuth()
  const LoginRoute = getRouteApi("/");
  const navigate = LoginRoute.useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => logoutSession(),
    onMutate: () => console.log("onmutate"),
    onSuccess: async () => {
      setUser(null)
      queryClient.removeQueries()
      await router.invalidate().finally(() => {
        navigate({to: "/"})
      })
    },
    onError: () => setUser(null)
  })
}