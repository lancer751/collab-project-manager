import { Task, TaskChanges, TaskFormData } from "@/types/task.types";
import { mainApiInstance } from "./instaces";
import { Project } from "@/types/project.types";
type ProjectSummary = Pick<Project, "id" | "name">;

export const createNewTask = async (taskData: TaskChanges) => {
  try {
    const response = await mainApiInstance.post<TaskFormData>(
      "/dashboardadmin/addactivities",
      taskData
    );
    return response.data;
  } catch (error) {
    console.log("Error in createNewTask", error);
    throw error;
  }
};

export const editSingleTask = async (taskData: TaskChanges, id: number) => {
  try {
    await mainApiInstance.put<TaskFormData>(
      `/dashboardadmin/editactivityid/${id}`,
      taskData
    );
  } catch (error) {
    console.log("Error in editSingleTask", error);
    throw error;
  }
}

export const getSingleTaskById = async (taskId: number) => {
  try {
    const response = await mainApiInstance.get<{
      activity: Task;
      project: ProjectSummary;
    }>(`/dashboardadmin/activtiesbyid/${taskId}`);
    return response.data;
  } catch (error) {
    console.log("Error in getSingleTaskById", error);
    throw error;
  }
};

export const getInfinityTasks = async ({ page = 0 }) => {
  try {
    const response = await mainApiInstance.get<{
      totalItems: number;
      activities: Task[];
      totalPages: number,
      currentPage: number
    }>(`/dashboardadmin/activitiesall?page=${page}`);
    return response.data;
  } catch (error) {
    console.log("Error in getInfinityTasks", error);
    throw error;
  }
};

export const getSummaryProjects = async () => {
  try {
    const response = await mainApiInstance.get<ProjectSummary[]>(
      "/dashboardadmin/activitiesproject"
    );
    return response.data;
  } catch (error) {
    console.log("Error in getSummaryProjects", error);
    throw error;
  }
};
