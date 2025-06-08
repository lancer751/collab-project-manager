import { getRecentComments } from "@/services/commets";
import { useQuery } from "@tanstack/react-query";

export function useRecentComments() {
  return useQuery({
    queryKey: ["recent-comments"],
    queryFn: getRecentComments,
  });
}
