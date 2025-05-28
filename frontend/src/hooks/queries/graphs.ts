import {
  getCountLatestProjects,
  getCountProjectsByState,
  getRelevantKPIS,
  getTasksByState,
  getTasksByUser,
} from "@/services/graphs";
import { useQuery } from "@tanstack/react-query";

export function useLatestMonthProjects() {
  return useQuery({
    queryKey: ["latestMonthProjects"],
    queryFn: getCountLatestProjects,
    refetchOnWindowFocus: false
  });
}

export function useTasksByState() {
  return useQuery({
    queryKey: ["tasksByState"],
    queryFn: getTasksByState,
    refetchOnWindowFocus: false

  });
}

export function useRelevantKPIS() {
  return useQuery({
    queryKey: ["relevantKPIS"],
    queryFn: getRelevantKPIS,
    refetchOnWindowFocus: false

  });
}

export function useCountProjectsByState() {
  return useQuery({
    queryKey: ["countProjectsByState"],
    queryFn: getCountProjectsByState,
    refetchOnWindowFocus: false

  })
}

export function useCountTaksByUser() {
  return useQuery({
    queryKey: ["countTasksByUser"],
    queryFn: getTasksByUser,
    refetchOnWindowFocus: false

  })
}