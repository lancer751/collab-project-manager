import { getInfiniteProjects } from "@/services/projects";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteProjects() {
  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 0 }) => getInfiniteProjects({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        console.log(lastPage)
      if (lastPage.project.length === 0) {
        return undefined;
      }
      return ++lastPageParam;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam < 0) {
        return undefined;
      }
      return --firstPageParam;
    },
  });
}
