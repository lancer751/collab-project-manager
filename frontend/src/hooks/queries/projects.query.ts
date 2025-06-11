import { getInfiniteProjects, getProjectsByStatus, getProjectStatus } from "@/services/projects";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useInfiniteProjects() {
  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam = 0 }) => getInfiniteProjects({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
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

export function useProjectStatus() {
  return useQuery({
    queryKey: ["project-status"],
    queryFn: getProjectStatus
  })
}

export function useProjectsByStatus(status: string) {
  console.log(status)
  return useQuery({
    queryKey: ["projects-by-status", {status}],
    queryFn: async() => await getProjectsByStatus(status),
  })
}