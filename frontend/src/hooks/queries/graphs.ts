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
  });
}

export function useTasksByState() {
  return useQuery({
    queryKey: ["tasksByState"],
    queryFn: getTasksByState,
  });
}

export function useRelevantKPIS() {
  return useQuery({
    queryKey: ["relevantKPIS"],
    queryFn: getRelevantKPIS,
  });
}

export function useCountProjectsByState() {
  return useQuery({
    queryKey: ["countProjectsByState"],
    queryFn: getCountProjectsByState
  })
}

export function useCountTaksByUser() {
  return useQuery({
    queryKey: ["countTasksByUser"],
    queryFn: getTasksByUser
  })
}