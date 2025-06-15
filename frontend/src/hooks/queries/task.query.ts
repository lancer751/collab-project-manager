import { getInfinityTasks, getSingleTaskById } from "@/services/tasks";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useGetTaskById(id: number | null) {
  return useQuery({
    queryKey: ["task", { id }],
    queryFn: () => getSingleTaskById(id!),
    enabled: !!id,
  });
}

export function useInfiniteTask() {
  return useInfiniteQuery({
    queryKey: ["tasks"],
    queryFn: ({ pageParam = 0 }) => getInfinityTasks({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.activities.length === 0) {
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