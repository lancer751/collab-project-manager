import { getAllRoles } from "@/services/roles";
import { useQuery } from "@tanstack/react-query";


export function useGetAllRols() {
    return useQuery({
      queryKey: ["rols"],
      queryFn: getAllRoles,
      refetchOnWindowFocus: false
    })
  }