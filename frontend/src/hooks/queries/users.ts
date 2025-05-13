import { getAllUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    })
}