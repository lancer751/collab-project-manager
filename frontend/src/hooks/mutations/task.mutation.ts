import { createNewTask, editSingleTask } from "@/services/tasks";
import { TaskChanges } from "@/types/task.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (taskData: TaskChanges) =>
      createNewTask(taskData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({ queryKey: ["singleProject"] });
      await queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });
}

export function useEditTask() {
  const queryClient = useQueryClient()
return useMutation({
  mutationFn: async ({taskData, id} : {taskData: TaskChanges, id: number}) =>
    editSingleTask(taskData, id),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    await queryClient.invalidateQueries({ queryKey: ["singleProject"] });
    await queryClient.invalidateQueries({ queryKey: ["task"] });
  },
});
}