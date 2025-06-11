import { createProject, deleteProjectById } from "@/services/projects";
import { NewProjectData } from "@/types/project.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProject() {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (projectData: NewProjectData) =>
      createProject(projectData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["recent-projects"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => deleteProjectById(id),
    onSuccess:async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({ queryKey: ["recent-projects"] });
    }
  })
}